import {
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_SUCCESS_RESET,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
} from "../constants/commentConstants";

export const postCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return { loading: true };
    case POST_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case POST_COMMENT_SUCCESS_RESET:
      return { loading: false, success: false };
    case POST_COMMENT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const commentListReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { loading: true, comments: [] };
    case GET_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };
    case GET_COMMENTS_FAIL:
      return { loading: false, comments: [], error: action.payload };
    default:
      return state;
  }
};

export const commentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COMMENT_REQUEST:
      return { loading: true };
    case UPDATE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_COMMENT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_COMMENT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
