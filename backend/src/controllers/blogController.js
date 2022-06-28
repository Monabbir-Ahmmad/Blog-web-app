import asyncHandler from "express-async-handler";
import blogService from "../service/blogService.js";

// @desc Create blog
// @route POST /api/blog/create
// @access Protected
// @needs title, content, ?blogCoverImage
const createBlog = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
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
// @route GET /api/blog/?page=number&limit=number
// @access Protected
const getBlogList = asyncHandler(async (req, res) => {
  let { page, limit } = req.query;
  page = parseInt(page > 0 ? page : 1);
  limit = parseInt(limit > 0 ? limit : 12);

  const result = await blogService.getBlogList(page, limit);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Search for blogs by username or title
// @route Get /api/blog/search?page=number&limit=number&keyword=String
// @access Protected
const searchBlogs = asyncHandler(async (req, res) => {
  let { page, limit, keyword } = req.query;
  page = parseInt(page > 0 ? page : 1);
  limit = parseInt(limit > 0 ? limit : 12);
  keyword = decodeURIComponent(keyword || "");

  const result = await blogService.searchBlogs(keyword, page, limit);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get blogs of other user
// @route GET /api/blog/user/:userId?page=Number&limit=Number
// @access Protected
const getUserBlogList = asyncHandler(async (req, res) => {
  const userId = req.params?.userId;
  let { page, limit } = req.query;
  page = parseInt(page > 0 ? page : 1);
  limit = parseInt(limit > 0 ? limit : 12);

  const result = await blogService.getUserBlogList(userId, page, limit);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get blogs of current user
// @route GET /api/blog/personal?page=Number&limit=Number
// @access Protected
const getPersonalBlogList = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  let { page, limit } = req.query;
  page = parseInt(page > 0 ? page : 1);
  limit = parseInt(limit > 0 ? limit : 12);

  const result = await blogService.getUserBlogList(userId, page, limit);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get single blog
// @route GET /api/blog/find/:blogId
// @access Protected
const getBlog = asyncHandler(async (req, res) => {
  const blogId = req.params?.blogId;

  const result = await blogService.getBlogDetails(blogId);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Update blog
// @route PATCH /api/blog/update
// @access Protected
// @needs blogId, title, content, ?blogCoverImage, ?removeCoverImage
const updateBlog = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { blogId, title, content } = req.body;
  const coverImage = req.file?.filename;
  const removeCoverImage =
    !coverImage && parseInt(req.body.removeCoverImage) === 1;

  const result = await blogService.updateBlog(
    userId,
    blogId,
    title,
    content,
    coverImage,
    removeCoverImage
  );

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Like blog
// @route POST /api/blog/like
// @access Protected
// @needs blogId
const likeBlog = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { blogId } = req.body;

  const result = await blogService.updateBlogLikeStatus(userId, blogId);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Delete single blog
// @route Delete /api/blog/delete/:blogId
// @access Protected
// @needs blogId
const deleteBlog = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { blogId } = req.params;

  const result = await blogService.deleteBlog(userId, blogId);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

export default {
  createBlog,
  getBlogList,
  getUserBlogList,
  getPersonalBlogList,
  getBlog,
  updateBlog,
  likeBlog,
  deleteBlog,
  searchBlogs,
};
