import deleteUploadedFile from "../utils/deleteUploadedFile.js";
import HttpError from "../utils/httpError.js";
import blogDb from "../repository/db_repository/blogDb.js";
import blogCache from "../repository/cache_repository/blogCache.js";
import userService from "./userService.js";

const createBlog = async (userId, title, content, coverImage) => {
  const { body: user } = await userService.getProfileDetails(userId);

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
      error: new HttpError(403, "Must be logged in to post blogs."),
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

  return {
    success: true,
    body: blogList,
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

    return {
      success: true,
      body: blogList,
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
  const { body: user } = await userService.getProfileDetails(userId);

  if (user?.id) {
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
  } else {
    return {
      success: false,
      error: new HttpError(403, "Must be logged in to update your blogs."),
    };
  }
};

const updateBlogLikeStatus = async (userId, blogId) => {
  const { body: user } = await userService.getProfileDetails(userId);

  if (user?.id) {
    const { body: blog } = await getBlogDetails(blogId);

    if (blog?.id) {
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

      blogCache.cacheBlogById(blog?.id, blogDetails);

      return { success: true, body: blogDetails };
    } else {
      return { success: false, error: new HttpError(404, "Blog not found.") };
    }
  } else {
    return {
      success: false,
      error: new HttpError(403, "Must be logged in to like blogs."),
    };
  }
};

const deleteBlog = async (userId, blogId) => {
  const { body: user } = await userService.getProfileDetails(userId);

  if (user?.id) {
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
  } else {
    return {
      success: false,
      error: new HttpError(403, "Must be logged in to delete your blogs."),
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
