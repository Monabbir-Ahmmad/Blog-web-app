import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { blogListReducer, postBlogReducer } from "./reducers/blogReducer";
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
  userPasswordUpdateReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userPasswordUpdate: userPasswordUpdateReducer,
  postBlog: postBlogReducer,
  blogList: blogListReducer,
});

const userAuthInfoFromStorage = localStorage.getItem("userAuthInfo")
  ? JSON.parse(localStorage.getItem("userAuthInfo"))
  : {};

const initialState = {
  userLogin: { userAuthInfo: userAuthInfoFromStorage },
};

const reduxStore = configureStore({ reducer, preloadedState: initialState });

export default reduxStore;
