const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../../utils/fileUpload");

userRouter.get("/home", authMiddleware.authUser, userController.getHome);

userRouter.post(
  "/edit-profile",
  authMiddleware.authUser,
  upload.single("profilePicture"),
  userController.postEditProfile,
);

userRouter.get(
  "/fetch-post",
  authMiddleware.authUser,
  userController.fetchPosts,
);

userRouter.get(
  "/profile/:userId",
  authMiddleware.authUser,
  userController.getProfile,
);


userRouter.post(
  "/add-post",
  authMiddleware.authUser,
  upload.single("postPhoto"),
  userController.postAddPost,
);

userRouter.post(
  "/delete-post/:postId",
  authMiddleware.authUser,
  userController.postDeletePost,
);

userRouter.post(
  "/like-post/:postId",
  authMiddleware.authUser,
  userController.postLikePost,
);

userRouter.post(
  "/add-comment/:postId",
  authMiddleware.authUser,
  userController.postAddComment,
);

module.exports = userRouter;
