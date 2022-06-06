import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { filesUpload } from "../middleware/fileUploadMiddleware.js";
import { check } from "express-validator";
import { validationCheck } from "../middleware/validationMiddleware.js";
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
  .route("/signup")
  .post(
    filesUpload.single("userProfileImage"),
    [
      check("name", "Name field can not be empty.").notEmpty(),
      check("email", "Invalid email address.").isEmail(),
      check("gender", "Gender field can not be empty.").notEmpty(),
      check("dateOfBirth", "Date of birth must be a valid date.")
        .trim()
        .isDate(),
      check(
        "password",
        "Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      ).isStrongPassword(),
    ],
    validationCheck,
    authController.registerUser
  );

userRouter
  .route("/signin")
  .post(
    [check("email", "Invalid email address.").isEmail()],
    validationCheck,
    authController.loginUser
  );

userRouter
  .route("/profile")
  .get(verifyToken, userController.getUserProfile)
  .patch(
    verifyToken,
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
        .isDate(),
      check("password", "Password required.").notEmpty(),
    ],
    validationCheck,
    userController.updateUserProfile
  )
  .put(
    verifyToken,
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

userRouter.route("/profile/:id").get(verifyToken, userController.getOtherUser);

export default userRouter;
