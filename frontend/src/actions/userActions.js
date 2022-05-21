import axios from "axios";
import {
  POST_USER_LOGIN,
  POST_USER_REGISTER,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
} from "../constants/apiLinks";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
} from "../constants/userConstants";

export const register = (registrationData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const res = await axios.post(POST_USER_REGISTER, registrationData, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    saveToLocalStorage(res.data);
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

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(POST_USER_LOGIN, { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    saveToLocalStorage(res.data);
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
  localStorage.removeItem("userAuthInfo");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userAuthInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuthInfo.token}`,
      },
    };

    const res = await axios.get(
      `${GET_USER_PROFILE}/${userAuthInfo.id}`,
      config
    );

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

    const {
      userLogin: { userAuthInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuthInfo.token}`,
      },
    };

    const res = await axios.patch(
      `${UPDATE_USER_PROFILE}/${userAuthInfo.id}`,
      user,
      config
    );

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: res.data,
    });
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

      const {
        userLogin: { userAuthInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuthInfo.token}`,
        },
      };

      const res = await axios.put(
        `${UPDATE_USER_PROFILE}/${userAuthInfo.id}`,
        { oldPassword, newPassword },
        config
      );

      dispatch({
        type: USER_PASSWORD_UPDATE_SUCCESS,
        payload: res.data,
      });
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

function saveToLocalStorage(userAuthInfo, role) {
  localStorage.setItem(
    "userAuthInfo",
    JSON.stringify({ ...userAuthInfo, role: role })
  );
}
