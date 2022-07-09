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

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, userAuthInfo: action.payload };
    case USER_PROFILE_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_PROFILE_UPDATE_RESET:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export const userPasswordUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_PASSWORD_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_PASSWORD_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_PASSWORD_UPDATE_RESET:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export const userListReducer = (
  state = { users: [], pageCount: 0 },
  action
) => {
  switch (action.type) {
    case GET_USER_LIST_REQUEST:
      return { loading: true, users: [], pageCount: 0 };
    case GET_USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload.userList,
        pageCount: action.payload.pageCount,
      };
    case GET_USER_LIST_FAIL:
      return { loading: false, users: [], pageCount: 0, error: action.payload };
    default:
      return state;
  }
};
