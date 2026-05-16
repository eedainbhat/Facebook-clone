const { validationResult, check } = require("express-validator");
const User = require("../models/user.model");
const path = require("path");
const fs = require("fs/promises");
const postModel = require("../models/post.model");
const { getRelativeTime } = require("../services/timeFormatter");

exports.getHome = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "User Home",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching user home",
    });
  }
};

exports.postEditProfile = [
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
      const { username, email, phoneNumber, bio } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const oldPfp = existingUser.profilePicture;
      let profilePicture;
      if (req.file) {
        profilePicture = "/" + req.file.path.replace(/\\/g, "/");

        if (oldPfp && oldPfp.startsWith("/uploads/")) {
          const oldFilePath = path.join(process.cwd(), oldPfp);
          try {
            await fs.unlink(oldFilePath);
          } catch (error) {
            console.error("Could not delete old image:", error.message);
          }
        }
      }

      const user = await User.findOneAndUpdate(
        { email },
        { username, email, phoneNumber, profilePicture, bio },
        { returnDocument: "after" },
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Profile updated",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error while editing profile",
      });
    }
  },
];

exports.fetchPosts = async (req, res) => {
  try {
    const userId = req.query?.userId || req.body?.userId;

    let posts;
    if (userId) {
      posts = await postModel
        .find({ publisher: userId })
        .sort({ timePosted: -1 })
        .populate("publisher", "username profilePicture isVerified")
        .populate("comments.user", "username profilePicture isVerified")
        .lean();
    } else {
      posts = await postModel
        .find()
        .sort({ timePosted: -1 })
        .populate("publisher", "username profilePicture isVerified")
        .populate("comments.user", "username profilePicture isVerified")
        .lean();
    }

    const formattedPosts = posts.map((post) => ({
      ...post,
      timePosted: getRelativeTime(post.timePosted),
    }));


    res.status(200).json({
      message: "Posts fetched",
      posts: formattedPosts,
    });
  } catch (error) {
    console.error("Error in fetchPosts:", error.stack || error);
    return res.status(500).json({
      message: "Error while fetching posts",
    });
  }
};

exports.postAddPost = async (req, res) => {
  check("description").notEmpty().withMessage("Description is required");

  try {
    const { publisher, description } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    let postPhoto;
    if (req.file) {
      postPhoto = "/" + req.file.path.replace(/\\/g, "/");
    }

    const post = new postModel({ publisher, postPhoto, description });

    await post.save();
    await post.populate("publisher", "username profilePicture isVerified");

    res.status(201).json({
      message: "Post Shared",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while posting. Please try again",
    });
  }
};

exports.postDeletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await postModel.findByIdAndDelete(postId);

    const postPhoto = post.postPhoto;

    if (postPhoto && postPhoto.startsWith("/uploads/")) {
      const postPhotoPaths = path.join(process.cwd(), postPhoto);

      try {
        await fs.unlink(postPhotoPaths);
      } catch (error) {
        console.log("error while deleting post photos", error);
      }
    }

    return res.status(200).json({
      message: "Post deleted",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting the post",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching profile",
    });
  }
};

exports.postLikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const hasLiked = post.likes.includes(userId);
    if (hasLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: "Action done",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while liking the post",
    });
  }
};

exports.postAddComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    const commentContent = req.body.commentContent;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    };
    
    post.comments.push({
      user: userId,
      text: commentContent,
    });

    await post.save();

    await post.populate("comments.user", "username profilePicture isVerified");

    res.status(201).json({
      message: "Comment added",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while adding comment",
    });
  }
};
