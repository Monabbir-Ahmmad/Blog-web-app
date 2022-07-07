import authController from "../controllers/authController.js";
import calculateAge from "../utils/calculateAge.js";
import { check } from "express-validator";
import express from "express";
import { filesUpload } from "../middleware/fileUploadMiddleware.js";
import { validationCheck } from "../middleware/validationMiddleware.js";

const authRouter = express.Router();

authRouter.route("/signup").post(
  filesUpload.single("userProfileImage"),
  [
    check("name", "Name field can not be empty.").notEmpty(),
    check("email", "Invalid email address.").isEmail(),
    check("gender", "Gender field can not be empty.").notEmpty(),
    check("dateOfBirth")
      .trim()
      .isDate()
      .withMessage("Date of birth must be a valid date.")
      .bail()
      .custom((dateOfBirth) => calculateAge(dateOfBirth) >= 13)
      .withMessage("Must be at least 13 years old."),
    check(
      "password",
      "Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
    ).isStrongPassword(),
  ],
  validationCheck,
  authController.registerUser
);

authRouter
  .route("/signin")
  .post(
    [check("email", "Invalid email address.").isEmail()],
    validationCheck,
    authController.loginUser
  );

authRouter
  .route("/refreshtoken")
  .post(
    [check("refreshToken", "Refresh Token required.").notEmpty()],
    validationCheck,
    authController.refreshAccessToken
  );

export default authRouter;
