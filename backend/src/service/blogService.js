import deleteUploadedFile from "../utils/deleteUploadedFile.js";
import HttpError from "../utils/httpError.js";
import { paginate } from "../utils/paginate.js";
import blogDb from "../repository/db_repository/blogDb.js";
import userDb from "../repository/db_repository/userDb.js";
import userCache from "../repository/cache_repository/userCache.js";
import blogCache from "../repository/cache_repository/blogCache.js";

const createBlog = async (userId, title, content, coverImage) => {
  const user = await userCache.getUserById(
    userId,
    async () => await userDb.findUserById(userId)
  );

  if (user?.id) {
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
  } else {
    return {
      success: false,
      error: new HttpError(401, "Must be logged in to post blogs."),
    };
  }
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
  const blogList = await blogDb.findBlogList();

  return {
    success: true,
    body: paginate(blogList, page, limit),
  };
};

const searchBlogs = async (keyword, page, limit) => {
  const blogList = await blogDb.findBlogsByUsernameOrTitle(keyword);

  return {
    success: true,
    body: paginate(blogList, page, limit),
  };
};

const getUserBlogList = async (userId) => {
  const blogList = await blogCache.getUserBlogList(
    userId,
    async () => await blogDb.findBlogListByUserId(userId)
  );

  return {
    success: true,
    body: blogList,
  };
};

const updateBlog = async (userId, blogId, title, content, coverImage) => {
  const blog = await blogCache.getBlogById(
    blogId,
    async () => await blogDb.findBlogById(blogId)
  );

  const blogOwner = blog?.user?.id === userId;

  if (blog?.id && blogOwner) {
    title = title || blog.title;
    content = content || blog.content;
    coverImage = coverImage || blog.coverImage;

    const updatedBlog = await blogDb.updateBlog(
      blogId,
      title,
      content,
      coverImage
    );

    if (updateBlog && coverImage !== blog.coverImage)
      deleteUploadedFile(blog.coverImage);

    const blogDetails = {
      id: blog.id,
      title,
      content,
      coverImage,
      createdAt: blog.createdAt,
      updatedAt: new Date(),
      user: blog.user,
      likes: blog.likes,
    };

    blogCache.cacheBlogById(blog.id, blogDetails);

    return updatedBlog
      ? {
          success: true,
          body: blogDetails,
        }
      : { success: false, error: new HttpError(400, "Failed to update blog.") };
  } else if (!blog) {
    return { success: false, error: new HttpError(404, "Blog not found.") };
  } else {
    return {
      success: false,
      error: new HttpError(401, "Unauthorized. Not the owner of the blog."),
    };
  }
};

const updateBlogLikeStatus = async (userId, blogId) => {
  const user = await userCache.getUserById(
    userId,
    async () => await userDb.findUserById(userId)
  );

  const blog = await blogCache.getBlogById(
    blogId,
    async () => await blogDb.findBlogById(blogId)
  );

  if (user?.id && blog?.id) {
    const updatedLike = await blogDb.updateBlogLikeStatus(userId, blogId);

    const blogDetails = {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      coverImage: blog.coverImage,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      user: blog.user,
      likes: [
        ...blog.likes.filter((like) => like.userId != updatedLike.userId),
        { ...updatedLike },
      ],
    };

    blogCache.cacheBlogById(blog?.Id, blogDetails);

    return { success: true, body: blogDetails };
  } else if (!user?.id) {
    return { success: false, error: new HttpError(401, "Must be logged in.") };
  } else {
    return { success: false, error: new HttpError(404, "Blog not found.") };
  }
};

const deleteBlog = async (userId, blogId) => {
  const blog = await blogCache.getBlogById(
    blogId,
    async () => await blogDb.findBlogById(blogId)
  );

  const blogOwner = blog?.user?.id === userId;

  if (blog?.id && blogOwner) {
    const deletedBlog = await blogDb.deleteBlogById(blogId);

    if (!deletedBlog) {
      return {
        success: false,
        error: new HttpError(400, "Failed to delete blog."),
      };
    }

    deleteUploadedFile(blog.coverImage);
    blogCache.deleteBlogById(blog.id);

    return { success: true, body: { blogId, message: "Blog deleted." } };
  } else if (!blog?.id) {
    return { success: false, error: new HttpError(404, "Blog not found.") };
  } else {
    return {
      success: false,
      error: new HttpError(401, "Unauthorized. Not the owner of the blog."),
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
