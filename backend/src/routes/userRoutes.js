import calculateAge from "../utils/calculateAge.js";
import { check } from "express-validator";
import express from "express";
import { filesUpload } from "../middleware/fileUploadMiddleware.js";
import userController from "../controllers/userController.js";
import { validationCheck } from "../middleware/validationMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.use(verifyToken);

userRouter.route("/profile/:userId").get(userController.getUserDetails);

userRouter.route("/users").get(userController.getUserList);

userRouter.route("/profile").patch(
  filesUpload.single("userProfileImage"),
  [
    check("name", "Name field can not be empty.")
      .optional({ nullable: true })
      .notEmpty(),
    check("email", "Invalid email address.")
      .optional({ nullable: true })
      .isEmail(),
    check("gender", "Gender field can not be empty.")
      .optional({ nullable: true })
      .notEmpty(),
    check("dateOfBirth", "Date of birth must be a valid date.")
      .optional({ nullable: true })
      .trim()
      .isDate()
      .withMessage("Date of birth must be a valid date.")
      .bail()
      .custom((dateOfBirth) => calculateAge(dateOfBirth) >= 13)
      .withMessage("Must be at least 13 years old."),
    check("password", "Password required.").notEmpty(),
  ],
  validationCheck,
  userController.updateUserProfile
);

userRouter
  .route("/password")
  .put(
    [
      check("oldPassword").notEmpty().withMessage("Old password required."),
      check("newPassword")
        .notEmpty()
        .withMessage("New password required.")
        .bail()
        .isStrongPassword()
        .withMessage(
          "Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
        ),
    ],
    validationCheck,
    userController.updateUserPassword
  );

export default userRouter;
