import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utils/passwordEncryption.js";
import UserType from "../models/userTypeModel.js";
import Blog from "../models/blogModel.js";

// @desc Create blog
// @route POST /api/v1/blog/create
// @access private
// @needs title, content
const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const user = await User.findByPk(req.user.id);
  if (user) {
    const blog = await Blog.create({
      title,
      content,
      coverImage: req.file?.filename,
    });

    await blog.setUser(user);

    blog.user = await blog.getUser();

    res.status(200).json({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      coverImage: blog.coverImage,
      updatedAt: blog.updatedAt,
      user: {
        id: blog.user.id,
        name: blog.user.name,
        profileImage: blog.user.profileImage,
      },
    });
  } else {
    res.status(404);
    throw new Error("Must be logged in");
  }
});

// @desc Get single blog
// @route GET /api/v1/blog/:id
// @access private
const getSingleBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findByPk(id, {
    attributes: ["id", "title", "content", "coverImage", "updatedAt"],
    include: {
      model: User,
      attributes: ["id", "name", "profileImage"],
    },
  });

  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc Update blog
// @route PATCH /api/v1/blog/update
// @access private
const updateBlog = asyncHandler(async (req, res) => {
  const { id, title, content } = req.body;
  const userId = req.user.id;

  const blog = await Blog.findByPk(id, { include: User });

  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.coverImage = req.file?.filename || blog.coverImage;

    await Blog.update(
      {
        title: blog.title,
        content: blog.content,
        coverImage: blog.coverImage,
      },
      { where: { id: blog.id, userId } }
    );

    res.status(200).json({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      coverImage: blog.coverImage,
      updatedAt: new Date(),
      user: {
        id: blog.user.id,
        name: blog.user.name,
        profileImage: blog.user.profileImage,
      },
    });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

export { createBlog, getSingleBlog, updateBlog };
