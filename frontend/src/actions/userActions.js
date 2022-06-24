import {
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,
} from "../constants/apiLinks";
import { USER_LOGIN_SUCCESS } from "../constants/authConstants";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
  USER_PROFILE_UPDATE_SUCCESS_RESET,
  USER_PASSWORD_UPDATE_SUCCESS_RESET,
} from "../constants/userConstants";
import api from "../service/api";
import TokenService from "../service/token.service";

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

    setTimeout(
      () => dispatch({ type: USER_PROFILE_UPDATE_SUCCESS_RESET }),
      4000
    );
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

      setTimeout(
        () => dispatch({ type: USER_PASSWORD_UPDATE_SUCCESS_RESET }),
        4000
      );
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
