import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { check } from "express-validator";
import { validationCheck } from "../middleware/validationMiddleware.js";
import commentController from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.use(verifyToken);

commentRouter
  .route("/create")
  .post(
    [
      check("blogId", "Blog id required.").notEmpty(),
      check("text", "Text can not be empty.").notEmpty(),
      check("parentId")
        .optional({ nullable: true })
        .notEmpty()
        .withMessage("Parent comment id required for comment reply."),
    ],
    validationCheck,
    commentController.postComment
  );

commentRouter.route("/:blogId").get(commentController.getBlogComments);

commentRouter
  .route("/update")
  .put(
    [
      check("commentId", "Comment id required.").notEmpty(),
      check("text", "Text can not be empty.").notEmpty(),
    ],
    validationCheck,
    commentController.updateComment
  );

commentRouter
  .route("/delete/:commentId")
  .delete(commentController.deleteComment);

export default commentRouter;
