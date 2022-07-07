import blogController from "../controllers/blogController.js";
import { check } from "express-validator";
import express from "express";
import { filesUpload } from "../middleware/fileUploadMiddleware.js";
import { validationCheck } from "../middleware/validationMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const blogRouter = express.Router();

blogRouter.use(verifyToken);

blogRouter
  .route("/create")
  .post(
    filesUpload.single("blogCoverImage"),
    [
      check("title", "Title field can not be empty.")
        .notEmpty()
        .withMessage("Title field can not be empty.")
        .isLength({ max: 200 })
        .withMessage("Title is too large. Maximum length is 200 characters."),
      check("content", "Content field can not be empty.").notEmpty(),
    ],
    validationCheck,
    blogController.createBlog
  );

blogRouter.route("/search").get(blogController.searchBlogs);

blogRouter.route("/user/:userId").get(blogController.getUserBlogList);

blogRouter.route("/:blogId").get(blogController.getBlog);

blogRouter
  .route("/update")
  .patch(
    filesUpload.single("blogCoverImage"),
    [
      check("blogId", "Blog id required.").notEmpty(),
      check("title")
        .optional({ nullable: true })
        .notEmpty()
        .withMessage("Title field can not be empty.")
        .isLength({ max: 200 })
        .withMessage("Title is too large. Maximum length is 200 characters."),
      check("content", "Content field can not be empty.")
        .optional({ nullable: true })
        .notEmpty(),
    ],
    validationCheck,
    blogController.updateBlog
  );

blogRouter
  .route("/like")
  .post(
    [check("blogId", "Blog id required.").notEmpty()],
    validationCheck,
    blogController.likeBlog
  );

blogRouter.route("/delete/:blogId").delete(blogController.deleteBlog);

export default blogRouter;
