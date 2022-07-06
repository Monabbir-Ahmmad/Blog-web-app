import asyncHandler from "express-async-handler";
import commentService from "../service/commentService.js";

// @desc Comment on blog
// @route POST /api/comment/
// @access Protected
// @needs blogId, text, ?parentId
const postComment = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { blogId, text, parentId } = req.body;

  const result = await commentService.postComment(
    userId,
    blogId,
    text,
    parentId
  );

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get comments for blog
// @route Get /api/comment/:blogId
// @access Protected
const getBlogComments = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId;

  const result = await commentService.getBlogComments(blogId);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Update a comment
// @route Put /api/comment/update
// @access Protected
// @needs commentId, text
const updateComment = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { commentId, text } = req.body;

  const result = await commentService.updateComment(userId, commentId, text);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Delete a comment
// @route Delete /api/comment/delete/:commentId
// @access Protected
const deleteComment = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const commentId = req.params.commentId;

  const result = await commentService.deleteComment(userId, commentId);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

export default {
  postComment,
  getBlogComments,
  updateComment,
  deleteComment,
};
