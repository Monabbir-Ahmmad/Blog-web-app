import { cache } from "../../config/cacheConfig.js";

const commentKeyPrefix = "commentId";
const blogCommentKeyPrefix = "blogCommentId";

const addBlogComment = (blogId, commentId, commentData) => {
  const commentIdArray = getCommentIdArray(blogCommentKeyPrefix, blogId) || [];

  if (commentIdArray.length && !commentIdArray.includes(commentId)) {
    commentIdArray.push(commentId);
    cacheCommentIdArray(blogCommentKeyPrefix, blogId, commentIdArray);
  }

  return cacheCommentById(commentId, commentData);
};

const removeCommentById = (commentId) => {
  const comment = cache.take(commentKeyPrefix + commentId);
  if (comment?.id) {
    console.log("Comment removed from cache.");
  }
  return comment;
};

const cacheCommentById = (commentId, commentData) => {
  const result = cache.set(commentKeyPrefix + commentId, commentData);
  console.log(result ? "Comment cached" : "Comment caching failed");
  return result;
};

const getCommentById = async (commentId, callback) => {
  let comment = cache.get(commentKeyPrefix + commentId);
  if (comment?.id) {
    console.log("Comment cache hit");
    return comment;
  }

  console.log("Comment cache miss");
  comment = await callback();
  cacheCommentById(commentId, comment);
  return comment;
};

const cacheCommentIdArray = (keyPrefix, keyNumber, commentIdArray = []) => {
  const result = cache.set(keyPrefix + keyNumber, commentIdArray);
  console.log(
    result ? "Comment id array cached" : "Comment id array caching failed"
  );
  return result;
};

const getCommentIdArray = (keyPrefix, keyNumber) => {
  const result = cache.get(keyPrefix + keyNumber);
  console.log(
    result ? "Comment id array cache hit" : "Comment id array cache miss"
  );
  return result;
};

const cacheCommentList = (commentList = []) => {
  commentList = commentList.map((comment) => {
    return { key: commentKeyPrefix + comment?.id, val: comment };
  });

  const result = cache.mset(commentList);
  console.log(result ? "Comment list cached" : "Comment list caching failed");
  return result;
};

const getCommentListByIds = async (commentIdArray = []) => {
  const commentList = [];

  if (commentIdArray?.length) {
    commentIdArray.forEach((id) => {
      const comment = cache.get(commentKeyPrefix + id);
      comment?.id && commentList.push(comment);
    });
  }

  if (commentList?.length && commentList?.length === commentIdArray?.length) {
    console.log("Comment list cache hit");
    return commentList;
  }

  console.log("Comment list cache miss");
  return null;
};

const cacheBlogComments = (blogId, commentList) => {
  const result = cacheCommentIdArray(
    blogCommentKeyPrefix,
    blogId,
    commentList.map((comment) => comment?.id)
  );

  const listResult = cacheCommentList(commentList);

  return result && listResult;
};

const getBlogComments = async (blogId, callback) => {
  const commentIdArray = getCommentIdArray(blogCommentKeyPrefix, blogId);

  let commentList = [];

  commentList = await getCommentListByIds(commentIdArray);

  if (commentList?.length) {
    return commentList;
  }

  commentList = await callback();
  cacheBlogComments(blogId, commentList);
  return commentList;
};

export default {
  addBlogComment,
  removeCommentById,
  cacheCommentById,
  getCommentById,
  getBlogComments,
};
