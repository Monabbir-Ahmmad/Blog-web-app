import {
  DELETE_BLOG_COMMENT,
  GET_BLOG_COMMENT_LIST,
  POST_BLOG_COMMENT,
  UPDATE_BLOG_COMMENT,
} from "../constants/apiLinks";
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

import api from "../service/api";

export const writeComment =
  (blogId, text, parentId = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: POST_COMMENT_REQUEST });

      const res = await api().post(POST_BLOG_COMMENT, {
        blogId,
        text,
        parentId,
      });

      dispatch({ type: POST_COMMENT_SUCCESS });

      const { commentList } = getState();

      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: [...commentList.comments, res.data],
      });

      setTimeout(() => dispatch({ type: POST_COMMENT_SUCCESS_RESET }), 1500);
    } catch (error) {
      dispatch({
        type: POST_COMMENT_FAIL,
        payload:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      });
    }
  };

export const getBlogComments = (blogId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_COMMENTS_REQUEST });

    const res = await api().get(`${GET_BLOG_COMMENT_LIST}/${blogId}`);

    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};

export const updateComment =
  (commentId, text) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_COMMENT_REQUEST });

      const res = await api().put(UPDATE_BLOG_COMMENT, { commentId, text });

      dispatch({
        type: UPDATE_COMMENT_SUCCESS,
      });

      const { commentList } = getState();

      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: commentList.comments.map((comment) =>
          comment.id === commentId ? res.data : comment
        ),
      });
    } catch (error) {
      dispatch({
        type: UPDATE_COMMENT_FAIL,
        payload:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      });
    }
  };

export const deleteComment = (commentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    await api().delete(`${DELETE_BLOG_COMMENT}/${commentId}`);

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
    });

    const { commentList } = getState();

    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: commentList.comments.filter(
        (comment) => comment.id !== commentId
      ),
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};
