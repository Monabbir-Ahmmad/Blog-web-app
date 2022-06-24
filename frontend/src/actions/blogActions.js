import {
  DELETE_PERSONAL_BLOG,
  GET_BLOG_LIST,
  GET_USER_BLOG_LIST,
  GET_SINGLE_BLOG,
  POST_BLOG,
  POST_BLOG_LIKE,
} from "../constants/apiLinks";
import {
  DELETE_PERSONAL_BLOG_FAIL,
  DELETE_PERSONAL_BLOG_REQUEST,
  DELETE_PERSONAL_BLOG_SUCCESS,
  DELETE_PERSONAL_BLOG_SUCCESS_RESET,
  GET_BLOGS_FAIL,
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_USER_BLOGS_FAIL,
  GET_USER_BLOGS_REQUEST,
  GET_USER_BLOGS_SUCCESS,
  GET_SINGLE_BLOG_FAIL,
  GET_SINGLE_BLOG_REQUEST,
  GET_SINGLE_BLOG_SUCCESS,
  POST_BLOG_FAIL,
  POST_BLOG_REQUEST,
  POST_BLOG_SUCCESS,
  POST_BLOG_SUCCESS_RESET,
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

    setTimeout(() => dispatch({ type: POST_BLOG_SUCCESS_RESET }), 4000);
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
        `${GET_BLOG_LIST}?page=${page}&limit=${limit}&keyword=${keyword}`
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

export const deletePersonalBlog = (blogId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PERSONAL_BLOG_REQUEST });

    await api().delete(`${DELETE_PERSONAL_BLOG}/${blogId}`);

    dispatch({
      type: DELETE_PERSONAL_BLOG_SUCCESS,
    });

    const {
      blogList: { blogs },
    } = getState();

    const {
      userBlogList: { blogs: userBlogs },
    } = getState();

    dispatch({
      type: GET_BLOGS_SUCCESS,
      payload: blogs.filter((blog) => blog.id !== blogId),
    });

    dispatch({
      type: GET_USER_BLOGS_SUCCESS,
      payload: userBlogs.filter((blog) => blog.id !== blogId),
    });

    setTimeout(
      () => dispatch({ type: DELETE_PERSONAL_BLOG_SUCCESS_RESET }),
      4000
    );
  } catch (error) {
    dispatch({
      type: DELETE_PERSONAL_BLOG_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });

    setTimeout(
      () => dispatch({ type: DELETE_PERSONAL_BLOG_SUCCESS_RESET }),
      4000
    );
  }
};
