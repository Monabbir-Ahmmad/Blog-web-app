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

  blog.user = await blog.getUser();

  return {
    id: blog.id,
    title: blog.title,
    content: blog.content,
    coverImage: blog.coverImage,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    user: {
      id: blog.user.id,
      name: blog.user.name,
      profileImage: blog.user.profileImage,
    },
    likes: [],
  };
};

const findBlogList = async (page, limit) => {
  const { count, rows } = await Blog.findAndCountAll({
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
        attributes: ["userId", "hasLiked"],
      },
    ],
    offset: limit * (page - 1),
    limit: limit,
    order: [["id", "DESC"]],
  });

  return rows;
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
        attributes: ["userId", "hasLiked"],
      },
    ],
  });
};

const findBlogListByUserId = async (userId) => {
  return await Blog.findAll({
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
        attributes: ["userId", "hasLiked"],
      },
    ],
    where: { userId },
    order: [["id", "DESC"]],
  });
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
  const like = await Like.findOrCreate({
    where: { userId, blogId },
  });

  if (like) {
    await Like.update(
      { hasLiked: !like[0].hasLiked },
      { where: { id: like[0].id } }
    );
  }

  return {
    userId,
    hasLiked: !like[0]?.hasLiked,
  };
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
        attributes: ["userId", "hasLiked"],
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
    order: [["id", "DESC"]],
  });

  return rows;
};

export default {
  createBlog,
  findBlogById,
  findBlogList,
  findBlogListByUserId,
  updateBlog,
  updateBlogLikeStatus,
  deleteBlogById,
  findBlogsByUsernameOrTitle,
};
