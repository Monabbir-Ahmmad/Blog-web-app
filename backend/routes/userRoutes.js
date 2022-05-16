import express from "express";
import {
  loginUser,
  getUserProfile,
  registerUser,
  updateUserPassword,
  updateUserProfile,
  getOtherUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { filesUpload } from "../middleware/fileUploadMiddleware.js";
import { check } from "express-validator";
import { validationCheck } from "../middleware/validationMiddleware.js";

const userRouter = express.Router();

userRouter
  .route("/signup")
  .post(
    filesUpload.single("userProfileImage"),
    [
      check("name", "Name field can not be empty.").notEmpty(),
      check("email", "Invalid email address.").isEmail(),
      check("gender", "Gender field can not be empty.").notEmpty(),
      check("dateOfBirth", "Date of birth must be a valid date")
        .trim()
        .isDate(),
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
  .route("/profile")
  .get(verifyToken, getUserProfile)
  .patch(
    verifyToken,
    filesUpload.single("userProfileImage"),
    [
      check("name", "Name field can not be empty.").notEmpty(),
      check("email", "Invalid email address.").isEmail(),
      check("gender", "Gender field can not be empty.").notEmpty(),
      check("dateOfBirth", "Date of birth must be a valid date")
        .trim()
        .isDate(),
    ],
    updateUserProfile
  )
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

userRouter.route("/profile/:id").get(verifyToken, getOtherUser);

export default userRouter;
