import Blog from "../../models/blogModel.js";
import Comment from "../../models/commentModel.js";
import User from "../../models/userModel.js";

const createComment = async (userId, blogId, text, parentId) => {
  const user = await User.findByPk(userId);
  const blog = await Blog.findByPk(blogId);

  let parent;
  if (parentId) {
    parent = await Comment.findByPk(parentId);
  }

  const comment = await Comment.create({
    text,
  });

  await comment.setUser(user);
  await comment.setBlog(blog);
  if (parent) {
    await comment.setParent(parent);
  }

  return {
    id: comment.id,
    text: comment.text,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    parentId: comment.parentId,
    user: {
      id: user.id,
      name: user.name,
      profileImage: user.profileImage,
    },
  };
};

const findCommentsByBlogId = async (blogId) => {
  const commentList = await Comment.findAll({
    attributes: ["id", "text", "createdAt", "updatedAt", "parentId"],
    include: [
      {
        model: User,
        attributes: ["id", "name", "profileImage"],
      },
    ],
    where: { blogId },
  });

  return commentList;
};

const findCommentById = async (commentId) => {
  return await Comment.findByPk(commentId, {
    attributes: ["id", "text", "createdAt", "updatedAt", "parentId"],
    include: [
      {
        model: User,
        attributes: ["id", "name", "profileImage"],
      },
    ],
  });
};

const updateComment = async (userId, commentId, text) => {
  return await Comment.update({ text }, { where: { id: commentId, userId } });
};

const deleteComment = async (userId, commentId) => {
  return await Comment.destroy({ where: { id: commentId, userId } });
};

export default {
  createComment,
  findCommentsByBlogId,
  findCommentById,
  updateComment,
  deleteComment,
};
