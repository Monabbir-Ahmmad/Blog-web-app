import asyncHandler from "express-async-handler";
import blogService from "../service/blogService.js";
import blogDbService from "../service/db_service/blogDbService.js";
import userDbService from "../service/db_service/userDbService.js";

// @desc Create blog
// @route POST /api/v1/blog/create
// @access Protected
// @needs title, content, ?blogCoverImage
const createBlog = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;
  const coverImage = req.file?.filename;

  const result = await blogService.createBlog(
    userId,
    title,
    content,
    coverImage
  );

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get blog list by page number
// @route GET /api/v1/blog/?page=number
// @access Protected
const getBlogList = asyncHandler(async (req, res) => {
  const page = req.query?.page || 1;

  const result = await blogService.getBlogList(page);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get single blog
// @route GET /api/v1/blog/:id
// @access Protected
const getBlog = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  const result = await blogService.getBlog(id);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Update blog
// @route PATCH /api/v1/blog/update
// @access Protected
// @needs blog id, title, content, ?blogCoverImage
const updateBlog = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id, title, content } = req.body;
  const coverImage = req.file?.filename;

  const result = await blogService.updateBlog(
    userId,
    id,
    title,
    content,
    coverImage
  );

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Like blog
// @route POST /api/v1/blog/like
// @access Protected
// @needs blog id
const likeBlog = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.body;

  const result = await blogService.updateBlogLikeStatus(userId, id);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Delete single blog
// @route Delete /api/v1/blog/delete
// @access Protected
// @needs blog id
const deleteBlog = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.body;

  const result = await blogService.deleteBlog(userId, id);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

export default {
  createBlog,
  getBlogList,
  getBlog,
  updateBlog,
  likeBlog,
  deleteBlog,
};
