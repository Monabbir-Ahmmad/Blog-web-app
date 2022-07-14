import {
  GET_USER_LIST,
  GET_USER_PROFILE,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PROFILE,
} from "../constants/apiLinks";
import {
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_RESET,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_RESET,
} from "../constants/userConstants";

import TokenService from "../service/token.service";
import { USER_LOGIN_SUCCESS } from "../constants/authConstants";
import api from "../service/api";

export const getUserDetails = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const res = await api().get(`${GET_USER_PROFILE}/${userId}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

    const res = await api("multipart/form-data").patch(
      UPDATE_USER_PROFILE,
      user
    );

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    TokenService.setUser({
      id: res.data.id,
      name: res.data.name,
      profileImage: res.data.profileImage,
      refreshToken: res.data.refreshToken,
      accessToken: res.data.accessToken,
    });

    setTimeout(() => dispatch({ type: USER_PROFILE_UPDATE_RESET }), 4000);
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};

export const updateUserPassword =
  (oldPassword, newPassword) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_PASSWORD_UPDATE_REQUEST });

      await api().put(UPDATE_USER_PASSWORD, { oldPassword, newPassword });

      dispatch({ type: USER_PASSWORD_UPDATE_SUCCESS });

      setTimeout(() => dispatch({ type: USER_PASSWORD_UPDATE_RESET }), 4000);
    } catch (error) {
      dispatch({
        type: USER_PASSWORD_UPDATE_FAIL,
        payload:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      });
    }
  };

export const getUserList =
  (page = 1, sort = 0, keyword = "", limit = 12) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_USER_LIST_REQUEST });

      const res = await api().get(
        `${GET_USER_LIST}/?page=${page}&limit=${limit}&sort=${sort}&keyword=${encodeURIComponent(
          keyword
        )}`
      );

      dispatch({
        type: GET_USER_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_LIST_FAIL,
        payload:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error.message,
      });
    }
  };
