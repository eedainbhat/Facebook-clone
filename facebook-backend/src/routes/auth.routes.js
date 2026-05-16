const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')


authRouter.post('/sign-up', authController.postSignUp);

authRouter.post('/login', authController.postLogin);

authRouter.post('/logout', authController.postLogout);

authRouter.post(
  "/delete-profile/:userId",
  authMiddleware.authUser,
  authController.postDeleteProfile,
);

module.exports = authRouter;