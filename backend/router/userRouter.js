import express from "express";
import {
  loginUser,
  getUserProfile,
  registerUser,
  updateUserPassword,
  updateUserProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { filesUpload } from "../middleware/fileUploadMiddleware.js";
import { check } from "express-validator";
import { validationCheck } from "../middleware/validationMiddleware.js";

const userRouter = express.Router();

userRouter
  .route("/signup")
  .post(
    filesUpload.single("profileImage"),
    [
      check("name", "Name field can not be empty.").notEmpty(),
      check("email", "Invalid email address.").isEmail(),
      check("gender", "Gender field can not be empty.").notEmpty(),
      check("dateOfBirth", "Date of birth field can not be empty.").notEmpty(),
      check(
        "password",
        "Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      ).isStrongPassword(),
    ],
    validationCheck,
    registerUser
  );

userRouter
  .route("/signin")
  .post(
    [check("email", "Invalid email address.").isEmail()],
    validationCheck,
    loginUser
  );

userRouter
  .route("/profile/:id")
  .get(verifyToken, getUserProfile)
  .patch(verifyToken, updateUserProfile)
  .put(
    verifyToken,
    [
      check(
        "newPassword",
        "Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      ).isStrongPassword(),
    ],
    validationCheck,
    updateUserPassword
  );

export default userRouter;
