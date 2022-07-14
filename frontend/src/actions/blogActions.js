import {
  DELETE_BLOG,
  GET_BLOG_LIST,
  GET_SINGLE_BLOG,
  GET_USER_BLOG_LIST,
  POST_BLOG,
  POST_BLOG_LIKE,
  UPDATE_BLOG,
} from "../constants/apiLinks";
import {
  DELETE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_RESET,
  GET_BLOGS_FAIL,
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_SINGLE_BLOG_FAIL,
  GET_SINGLE_BLOG_REQUEST,
  GET_SINGLE_BLOG_SUCCESS,
  GET_USER_BLOGS_FAIL,
  GET_USER_BLOGS_REQUEST,
  GET_USER_BLOGS_SUCCESS,
  POST_BLOG_FAIL,
  POST_BLOG_REQUEST,
  POST_BLOG_SUCCESS,
  POST_BLOG_RESET,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_RESET,
} from "../constants/blogsConstants";

import api from "../service/api";

export const writeBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_BLOG_REQUEST });

    const res = await api("multipart/form-data").post(POST_BLOG, blog);

    dispatch({
      type: POST_BLOG_SUCCESS,
      payload: res.data,
    });

    setTimeout(() => dispatch({ type: POST_BLOG_RESET }), 4000);
  } catch (error) {
    dispatch({
      type: POST_BLOG_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};

export const getBlogList =
  (page = 1, keyword = "", limit = 12) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_BLOGS_REQUEST });

      const res = await api().get(
        `${GET_BLOG_LIST}?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
          keyword
        )}`
      );

      dispatch({
        type: GET_BLOGS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_BLOGS_FAIL,
        payload:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      });
    }
  };

export const getSingleBlog = (blogId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SINGLE_BLOG_REQUEST });

    const res = await api().get(`${GET_SINGLE_BLOG}/${blogId}`);

    dispatch({
      type: GET_SINGLE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_BLOG_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};

export const postBlogLike = async (blogId) => {
  const res = await api().post(POST_BLOG_LIKE, { blogId });
  return res.data;
};

export const getBlogToUpdate = async (blogId) => {
  const res = await api().get(`${GET_SINGLE_BLOG}/${blogId}`);
  return res.data;
};

export const getUserBlogs =
  (userId, page = 1, limit = 12) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_USER_BLOGS_REQUEST });

      const res = await api().get(
        `${GET_USER_BLOG_LIST}/${userId}?page=${page}&limit=${limit}`
      );

      dispatch({
        type: GET_USER_BLOGS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_BLOGS_FAIL,
        payload:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      });
    }
  };

export const deleteBlog = (blogId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_BLOG_REQUEST });

    await api().delete(`${DELETE_BLOG}/${blogId}`);

    dispatch({
      type: DELETE_BLOG_SUCCESS,
    });

    const { blogList } = getState();

    const { userBlogList } = getState();

    dispatch({
      type: GET_BLOGS_SUCCESS,
      payload: {
        blogList: blogList.blogs.filter((blog) => blog.id !== blogId),
        pageCount: blogList.pageCount,
      },
    });

    dispatch({
      type: GET_USER_BLOGS_SUCCESS,
      payload: {
        blogList: userBlogList.blogs.filter((blog) => blog.id !== blogId),
        pageCount: userBlogList.pageCount,
      },
    });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
  setTimeout(() => dispatch({ type: DELETE_BLOG_RESET }), 4000);
};

export const updateBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_BLOG_REQUEST });

    const res = await api().patch(UPDATE_BLOG, blog);

    dispatch({
      type: UPDATE_BLOG_SUCCESS,
    });

    const { blogList } = getState();

    const { userBlogList } = getState();

    dispatch({
      type: GET_BLOGS_SUCCESS,
      payload: {
        blogList: blogList.blogs.map((blog) =>
          blog.id === res.data.id ? res.data : blog
        ),
        pageCount: blogList.pageCount,
      },
    });

    dispatch({
      type: GET_USER_BLOGS_SUCCESS,
      payload: {
        blogList: userBlogList.blogs.map((blog) =>
          blog.id === res.data.id ? res.data : blog
        ),
        pageCount: userBlogList.pageCount,
      },
    });

    dispatch({
      type: GET_SINGLE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOG_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
  setTimeout(() => dispatch({ type: UPDATE_BLOG_RESET }), 4000);
};
