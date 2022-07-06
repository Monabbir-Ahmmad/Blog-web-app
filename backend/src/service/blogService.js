import deleteUploadedFile from "../utils/deleteUploadedFile.js";
import HttpError from "../utils/httpError.js";
import blogDb from "../repository/db_repository/blogDb.js";
import blogCache from "../repository/cache_repository/blogCache.js";
import userService from "./userService.js";

const createBlog = async (userId, title, content, coverImage) => {
  const blog = await blogDb.createBlog(userId, title, content, coverImage);

  blogCache.cacheBlogById(blog?.id, blog);

  return blog?.id
    ? {
        success: true,
        body: blog,
      }
    : {
        success: false,
        error: new HttpError(400, "Blog creation failed."),
      };
};

const getBlogDetails = async (blogId) => {
  const blog = await blogCache.getBlogById(
    blogId,
    async () => await blogDb.findBlogById(blogId)
  );

  if (blog?.id) {
    return {
      success: true,
      body: blog,
    };
  } else {
    return {
      success: false,
      error: new HttpError(404, "Blog not found."),
    };
  }
};

const getBlogList = async (page, limit) => {
  const blogList = await blogCache.getSearchedBlogs(
    page,
    limit,
    "",
    async () => await blogDb.findBlogList(page, limit)
  );

  return {
    success: true,
    body: blogList,
  };
};

const searchBlogs = async (keyword, page, limit) => {
  const blogList = await blogCache.getSearchedBlogs(
    page,
    limit,
    keyword,
    async () => await blogDb.findBlogsByUsernameOrTitle(keyword, page, limit)
  );

  const pageCount = Math.ceil((await blogDb.countBlogs(keyword)) / limit);

  return {
    success: true,
    body: { blogList, pageCount },
  };
};

const getUserBlogList = async (userId, page, limit) => {
  const { body: user } = await userService.getProfileDetails(userId);

  if (user?.id) {
    const blogList = await blogCache.getUserBlogList(
      userId,
      page,
      limit,
      async () => await blogDb.findBlogListByUserId(userId, page, limit)
    );

    const pageCount = Math.ceil((await blogDb.countUserBlogs(userId)) / limit);

    return {
      success: true,
      body: { blogList, pageCount },
    };
  } else {
    return { success: false, error: new HttpError(404, "User not found.") };
  }
};

const updateBlog = async (
  userId,
  blogId,
  title,
  content,
  coverImage,
  removeCoverImage
) => {
  const { body: blog } = await getBlogDetails(blogId);

  const blogOwner = blog?.user?.id === userId;

  if (blog?.id && blogOwner) {
    title = title || blog?.title;
    content = content || blog?.content;
    coverImage = coverImage || blog?.coverImage;

    if (removeCoverImage) coverImage = null;

    const updatedBlog = await blogDb.updateBlog(
      blogId,
      title,
      content,
      coverImage
    );

    if (updateBlog && blog?.coverImage && coverImage !== blog?.coverImage)
      deleteUploadedFile(blog?.coverImage);

    const blogDetails = {
      id: blog?.id,
      title,
      content,
      coverImage,
      createdAt: blog?.createdAt,
      updatedAt: new Date(),
      user: blog?.user,
      likes: blog?.likes,
    };

    blogCache.cacheBlogById(blog?.id, blogDetails);

    return updatedBlog
      ? {
          success: true,
          body: blogDetails,
        }
      : {
          success: false,
          error: new HttpError(400, "Failed to update blog."),
        };
  } else if (!blog?.id) {
    return { success: false, error: new HttpError(404, "Blog not found.") };
  } else {
    return {
      success: false,
      error: new HttpError(403, "Unauthorized. Not the owner of the blog."),
    };
  }
};

const updateBlogLikeStatus = async (userId, blogId) => {
  const { body: blog } = await getBlogDetails(blogId);

  if (blog?.id) {
    const likeStatus = await blogDb.updateBlogLikeStatus(userId, blogId);

    const blogDetails = {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      coverImage: blog.coverImage,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      user: blog.user,
      likes: blog.likes.filter((like) => like.userId != userId),
    };

    if (likeStatus) {
      blogDetails.likes.push({ userId });
    }

    blogCache.cacheBlogById(blog?.id, blogDetails);

    return { success: true, body: blogDetails };
  } else {
    return { success: false, error: new HttpError(404, "Blog not found.") };
  }
};

const deleteBlog = async (userId, blogId) => {
  const { body: blog } = await getBlogDetails(blogId);

  const blogOwner = blog?.user?.id === userId;

  if (blog?.id && blogOwner) {
    const deletedBlog = await blogDb.deleteBlogById(blogId);

    if (deletedBlog && blog?.coverImage) {
      deleteUploadedFile(blog?.coverImage);
    }

    blogCache.removeBlogById(blog?.id);

    return deletedBlog
      ? { success: true, body: { blogId, message: "Blog deleted." } }
      : {
          success: false,
          error: new HttpError(400, "Failed to delete blog."),
        };
  } else if (!blog?.id) {
    return { success: false, error: new HttpError(404, "Blog not found.") };
  } else {
    return {
      success: false,
      error: new HttpError(403, "Unauthorized. Not the owner of the blog."),
    };
  }
};

export default {
  createBlog,
  getBlogList,
  getBlogDetails,
  getUserBlogList,
  updateBlog,
  updateBlogLikeStatus,
  deleteBlog,
  searchBlogs,
};
