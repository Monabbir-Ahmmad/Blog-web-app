import { Op } from "sequelize";
import Blog from "../../models/blogModel.js";
import Like from "../../models/likeModel.js";
import User from "../../models/userModel.js";

const createBlog = async (userId, title, content, coverImage) => {
  const user = await User.findByPk(userId);

  const blog = await Blog.create({
    title,
    content,
    coverImage,
  });

  await blog.setUser(user);

  return {
    id: blog.id,
    title: blog.title,
    content: blog.content,
    coverImage: blog.coverImage,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    user: {
      id: user.id,
      name: user.name,
      profileImage: user.profileImage,
    },
    likes: [],
  };
};

const findBlogById = async (id) => {
  return await Blog.findByPk(id, {
    attributes: [
      "id",
      "title",
      "content",
      "coverImage",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: User,
        attributes: ["id", "name", "profileImage"],
      },
      {
        model: Like,
        attributes: ["userId"],
      },
    ],
  });
};

const findBlogListByUserId = async (userId, page, limit) => {
  const { count, rows } = await Blog.findAndCountAll({
    subQuery: false,
    attributes: [
      "id",
      "title",
      "content",
      "coverImage",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: User,
        attributes: ["id", "name", "profileImage"],
      },
      {
        model: Like,
        attributes: ["userId"],
      },
    ],
    where: { userId },
    offset: limit * (page - 1),
    limit: limit,
    order: [["createdAt", "DESC"]],
  });

  return rows;
};

const updateBlog = async (blogId, title, content, coverImage) => {
  return await Blog.update(
    {
      title,
      content,
      coverImage,
    },
    { where: { id: blogId } }
  );
};

const updateBlogLikeStatus = async (userId, blogId) => {
  const like = await Like.findOne({
    where: { userId, blogId },
  });

  if (like) {
    await Like.destroy({ where: { userId, blogId } });
    return false;
  } else {
    await Like.create({ userId, blogId });
    return true;
  }
};

const deleteBlogById = async (id) => {
  return await Blog.destroy({ where: { id } });
};

const findBlogsByUsernameOrTitle = async (keyword, page, limit) => {
  const { count, rows } = await Blog.findAndCountAll({
    subQuery: false,
    attributes: [
      "id",
      "title",
      "content",
      "coverImage",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: User,
        attributes: ["id", "name", "profileImage"],
      },
      {
        model: Like,
        attributes: ["userId"],
      },
    ],
    where: {
      [Op.or]: [
        { "$Blog.title$": { [Op.substring]: keyword } },
        { "$User.name$": { [Op.substring]: keyword } },
      ],
    },
    offset: limit * (page - 1),
    limit: limit,
    order: [["createdAt", "DESC"]],
  });

  return rows;
};

const countBlogs = async (keyword) => {
  return await Blog.count({
    include: [
      {
        model: User,
      },
    ],
    where: {
      [Op.or]: [
        { "$Blog.title$": { [Op.substring]: keyword } },
        { "$User.name$": { [Op.substring]: keyword } },
      ],
    },
  });
};

const countUserBlogs = async (userId) => {
  return await Blog.count({ where: { userId } });
};

export default {
  createBlog,
  findBlogById,
  findBlogListByUserId,
  updateBlog,
  updateBlogLikeStatus,
  deleteBlogById,
  findBlogsByUsernameOrTitle,
  countBlogs,
  countUserBlogs,
};
