import HttpError from "../utils/httpError.js";
import blogService from "./blogService.js";
import commentDb from "../repository/db_repository/commentDb.js";

const getComment = async (commentId) => {
  const comment = await commentDb.findCommentById(commentId);
  if (comment?.id) {
    return { success: true, body: comment };
  } else {
    return {
      success: false,
      error: new HttpError(404, "Comment not found."),
    };
  }
};

const postComment = async (userId, blogId, text, parentId) => {
  const { body: blog } = await blogService.getBlogDetails(blogId);

  if (blog?.id) {
    if (parentId) {
      const { body: comment } = await getComment(parentId);

      if (!comment?.id) {
        return {
          success: false,
          error: new HttpError(404, "Parent comment not found."),
        };
      }
    }

    const comment = await commentDb.createComment(
      userId,
      blogId,
      text,
      parentId
    );

    return comment?.id
      ? {
          success: true,
          body: comment,
        }
      : {
          success: false,
          error: new HttpError(400, "Comment post failed."),
        };
  } else {
    return {
      success: false,
      error: new HttpError(404, "Blog not found."),
    };
  }
};

const getBlogComments = async (blogId) => {
  const { body: blog } = await blogService.getBlogDetails(blogId);

  if (blog?.id) {
    const commentList = await commentDb.findCommentsByBlogId(blogId);

    return { success: true, body: commentList };
  } else {
    return {
      success: false,
      error: new HttpError(404, "Blog not found."),
    };
  }
};

const updateComment = async (userId, commentId, text) => {
  const { body: comment } = await getComment(commentId);

  const commentOwner = comment?.user?.id === userId;

  if (comment?.id && commentOwner) {
    await commentDb.updateComment(userId, commentId, text);

    comment.text = text;
    comment.updatedAt = new Date();

    return { success: true, body: comment };
  } else if (!comment?.id) {
    return {
      success: false,
      error: new HttpError(404, "Comment not found."),
    };
  } else {
    return {
      success: false,
      error: new HttpError(403, "Unauthorized. Not the owner of the comment."),
    };
  }
};

const deleteComment = async (userId, commentId) => {
  const { body: comment } = await getComment(commentId);

  const commentOwner = comment?.user?.id === userId;

  if (comment?.id && commentOwner) {
    await commentDb.deleteComment(userId, commentId);

    return { success: true, body: { commentId, message: "Comment deleted." } };
  } else if (!comment?.id) {
    return {
      success: false,
      error: new HttpError(404, "Comment not found."),
    };
  } else {
    return {
      success: false,
      error: new HttpError(403, "Unauthorized. Not the owner of the comment."),
    };
  }
};

export default {
  getComment,
  postComment,
  getBlogComments,
  updateComment,
  deleteComment,
};
