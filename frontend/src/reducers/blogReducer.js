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

export const postBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_BLOG_REQUEST:
      return { loading: true };
    case POST_BLOG_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case POST_BLOG_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POST_BLOG_RESET:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export const blogListReducer = (
  state = { blogs: [], pageCount: 0 },
  action
) => {
  switch (action.type) {
    case GET_BLOGS_REQUEST:
      return { loading: true, blogs: [], pageCount: 0 };
    case GET_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload.blogList,
        pageCount: action.payload.pageCount,
      };
    case GET_BLOGS_FAIL:
      return { loading: false, blogs: [], pageCount: 0, error: action.payload };
    default:
      return state;
  }
};

export const singleBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_BLOG_REQUEST:
      return { loading: true };
    case GET_SINGLE_BLOG_SUCCESS:
      return { loading: false, blog: action.payload };
    case GET_SINGLE_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userBlogListReducer = (
  state = { blogs: [], pageCount: 0 },
  action
) => {
  switch (action.type) {
    case GET_USER_BLOGS_REQUEST:
      return { loading: true, blogs: [], pageCount: 0 };
    case GET_USER_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload.blogList,
        pageCount: action.payload.pageCount,
      };
    case GET_USER_BLOGS_FAIL:
      return { loading: false, blogs: [], pageCount: 0, error: action.payload };
    default:
      return state;
  }
};

export const blogDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BLOG_REQUEST:
      return { loading: true };
    case DELETE_BLOG_SUCCESS:
      return { loading: false, success: true };
    case DELETE_BLOG_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_BLOG_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const blogUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BLOG_REQUEST:
      return { loading: true };
    case UPDATE_BLOG_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_BLOG_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_BLOG_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};
