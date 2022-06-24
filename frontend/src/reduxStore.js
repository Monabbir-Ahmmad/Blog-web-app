import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./reducers/authReducer";
import {
  blogListReducer,
  personalBlogDeleteReducer,
  postBlogReducer,
  singleBlogReducer,
  userBlogListReducer,
} from "./reducers/blogReducer";
import {
  userDetailsReducer,
  userProfileUpdateReducer,
  userPasswordUpdateReducer,
} from "./reducers/userReducer";
import TokenService from "./service/token.service";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userPasswordUpdate: userPasswordUpdateReducer,
  postBlog: postBlogReducer,
  blogList: blogListReducer,
  singleBlog: singleBlogReducer,
  userBlogList: userBlogListReducer,
  personalBlogDelete: personalBlogDeleteReducer,
});

const initialState = {
  userLogin: { userAuthInfo: TokenService.getUser() },
};

const reduxStore = configureStore({ reducer, preloadedState: initialState });

export default reduxStore;
