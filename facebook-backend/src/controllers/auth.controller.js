const { check, validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { createUser } = require("../services/userServices");
const path = require("path");
const fs = require("fs/promises");
const postModel = require("../models/post.model");
const mongoose = require("mongoose");

exports.postSignUp = [
  check("username")
    .notEmpty()
    .withMessage("username is required")
    .bail()
    .trim()
    .isLength({ min: 4, max: 30 })
    .withMessage("username must be between 4 and 30 characters")
    .bail()
    .matches(/^[A-Za-z]+$/)
    .withMessage("username must contain only letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .bail()
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("terms")
    .notEmpty()
    .withMessage("You must agree to the terms and conditions")
    .bail()
    .custom((value) => {
      if (value !== true) {
        throw new Error("You must agree to the terms and conditions");
      }
      return true;
    }),
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone Number is required")
    .bail()
    .isNumeric()
    .withMessage("Phone Number should only contain Numbers")
    .bail(),

  async (req, res) => {
    try {
      const { username, email, phoneNumber, password, confirmPassword, terms } =
        req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      const hashedPassword = await User.hashPassword(password);
      const user = await createUser({
        username,
        email,
        phoneNumber,
        password: hashedPassword,
      });

      const token = user.generateAuthToken();

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: [err.message],
      });
    }
  },
];

exports.postLogin = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .trim(),

  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        if (!errors.isEmpty()) {
          return res.status(400).json({
            message: errors.array()[0].msg,
          });
        }
      }

      if (!user) {
        return res.status(404).json({
          message: "Invalid credentials",
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = user.generateAuthToken();

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: "Something went wrong while Logining In",
      });
    }
  },
];

exports.postLogout = (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logout successfull",
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong while Logining Out`,
    });
  }
};

exports.postDeleteProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);

    const targetId = new mongoose.Types.ObjectId(userId);

    const posts = await postModel.find({ publisher: targetId });
    

    for (const post of posts) {
      const postPhoto = post.postPhoto;

      if (postPhoto && postPhoto.startsWith("/uploads/")) {
        const postPhotoPaths = path.join(process.cwd(), postPhoto);
        
        try {
          await fs.unlink(postPhotoPaths);
          console.log("photo deleted");
        } catch (error) {
          console.log("error while deleting post photos", error); 
        }
      }
    }
    
    await postModel.deleteMany({publisher: targetId});

    const userPfp = user.profilePicture;

    if (userPfp && userPfp.startsWith("/uploads/")) {
      const oldFilePath = path.join(process.cwd(), userPfp);
      try {
        await fs.unlink(oldFilePath);
        console.log("deleted");
        
      } catch (error) {
        console.error("Could not delete old image:", error);
      }
    }

    return res.status(200).json({
      message: "Account deleted",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while deleting user Account",
    });
  }
};
