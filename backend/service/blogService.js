import deleteUploadedFile from "../utils/deleteUploadedFile.js";
import HttpError from "../utils/httpError.js";
import blogDbService from "./db_service/blogDbService.js";
import userDbService from "./db_service/userDbService.js";

const createBlog = async (userId, title, content, coverImage) => {
  const user = await userDbService.findUserById(userId);

  if (user?.id) {
    const blog = await blogDbService.createBlog(
      userId,
      title,
      content,
      coverImage
    );

    return {
      success: true,
      body: blog,
    };
  } else {
    return {
      success: false,
      error: new HttpError(401, "Must be logged in to post blogs."),
    };
  }
};

const getBlogList = async (page) => {
  const blogList = await blogDbService.findBlogList(page);

  return {
    success: true,
    body: blogList,
  };
};

const getBlog = async (blogId) => {
  const blog = await blogDbService.findBlogById(blogId);

  if (blog) {
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

const updateBlog = async (userId, blogId, title, content, coverImage) => {
  const blog = await blogDbService.findBlogById(blogId);

  const blogOwner = blog?.user?.id === userId;

  if (blog && blogOwner) {
    title = title || blog.title;
    content = content || blog.content;
    coverImage = coverImage || blog.coverImage;

    const updatedBlog = await blogDbService.updateBlog(
      blogId,
      title,
      content,
      coverImage
    );

    if (updateBlog && coverImage !== blog.coverImage)
      deleteUploadedFile(blog.coverImage);

    return updatedBlog
      ? {
          success: true,
          body: {
            id: blogId,
            title,
            content,
            coverImage,
            createdAt: blog.createdAt,
            updatedAt: new Date(),
            user: blog.user,
            likes: blog.likes,
          },
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
  const blog = await blogDbService.findBlogById(blogId);

  if (blog) {
    const like = await blogDbService.updateBlogLikeStatus(userId, blogId);

    return { success: true, body: like };
  } else {
    return { success: false, error: new HttpError(404, "Blog not found.") };
  }
};

const deleteBlog = async (userId, blogId) => {
  const blog = await blogDbService.findBlogById(blogId);

  const blogOwner = blog?.user?.id === userId;

  if (blog && blogOwner) {
    const deletedBlog = await blogDbService.deleteBlogById(blogId);

    if (deleteBlog) deleteUploadedFile(blog.coverImage);

    return deletedBlog
      ? { success: true, body: { blogId, message: "Blog deleted." } }
      : { success: false, error: new HttpError(400, "Failed to delete blog.") };
  } else if (!blog) {
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
  getBlog,
  updateBlog,
  updateBlogLikeStatus,
  deleteBlog,
};
