import HttpError from "../utils/httpError.js";
import blogService from "./blogService.js";
import commentDb from "../repository/db_repository/commentDb.js";
import commentCache from "../repository/cache_repository/commentCache.js";

const getComment = async (commentId) => {
  const comment = await commentCache.getCommentById(
    commentId,
    async () => await commentDb.findCommentById(commentId)
  );

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

    if (comment?.id) {
      commentCache.addBlogComment(blogId, comment?.id, comment);

      return {
        success: true,
        body: comment,
      };
    } else {
      return {
        success: false,
        error: new HttpError(400, "Comment post failed."),
      };
    }
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
    const commentList = await commentCache.getBlogComments(
      blogId,
      async () => await commentDb.findCommentsByBlogId(blogId)
    );

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

    const commentDetails = {
      id: comment.id,
      text,
      createdAt: comment.createdAt,
      updatedAt: new Date(),
      parentId: comment.parentId,
      user: comment.user,
    };

    commentCache.cacheCommentById(comment.id, commentDetails);

    return { success: true, body: commentDetails };
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

    commentCache.removeCommentById(commentId);

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
