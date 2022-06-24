import axios from "axios";
import { POST_USER_LOGIN, POST_USER_REGISTER } from "../constants/apiLinks";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/authConstants";
import api from "../service/api";
import TokenService from "../service/token.service";

export const register = (registrationData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const res = await api("multipart/form-data").post(
      POST_USER_REGISTER,
      registrationData
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
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
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const res = await api().post(POST_USER_LOGIN, { email, password });

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
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  TokenService.removeUser();

  dispatch({
    type: USER_LOGOUT,
  });
};
