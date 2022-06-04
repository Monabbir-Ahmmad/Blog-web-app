import express from "express";
import blogController from "../controllers/blogController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { filesUpload } from "../middleware/fileUploadMiddleware.js";
import { check } from "express-validator";
import { validationCheck } from "../middleware/validationMiddleware.js";

const blogRouter = express.Router();

blogRouter.use(verifyToken);

blogRouter
  .route("/create")
  .post(
    filesUpload.single("blogCoverImage"),
    [
      check("title", "Title field can not be empty.")
        .notEmpty()
        .isLength({ max: 200 })
        .withMessage("Title is too large. Maximum length is 200 characters."),
      check("content", "Content field can not be empty.").notEmpty(),
    ],
    validationCheck,
    blogController.createBlog
  );

blogRouter.route("/").get(blogController.getBlogList);

blogRouter.route("/:id").get(blogController.getBlog);

blogRouter
  .route("/update")
  .patch(
    filesUpload.single("blogCoverImage"),
    [
      check("title", "Title field can not be empty.")
        .optional({ nullable: true })
        .notEmpty()
        .isLength({ max: 200 })
        .withMessage("Title is too large. Maximum length is 200 characters."),
      check("content", "Content field can not be empty.")
        .optional({ nullable: true })
        .notEmpty(),
    ],
    validationCheck,
    blogController.updateBlog
  );

blogRouter.route("/like").post(blogController.likeBlog);

blogRouter.route("/delete").delete(blogController.deleteBlog);

export default blogRouter;
