import {
  blogListReducer,
  blogDeleteReducer,
  blogUpdateReducer,
  postBlogReducer,
  singleBlogReducer,
  userBlogListReducer,
} from "./reducers/blogReducer";
import {
  commentDeleteReducer,
  commentListReducer,
  commentUpdateReducer,
  commentPostReducer,
} from "./reducers/commentReducer";
import {
  userDetailsReducer,
  userListReducer,
  userPasswordUpdateReducer,
  userProfileUpdateReducer,
} from "./reducers/userReducer";
import { userLoginReducer, userRegisterReducer } from "./reducers/authReducer";

import TokenService from "./service/token.service";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userPasswordUpdate: userPasswordUpdateReducer,
  userList: userListReducer,
  postBlog: postBlogReducer,
  blogList: blogListReducer,
  singleBlog: singleBlogReducer,
  userBlogList: userBlogListReducer,
  blogDelete: blogDeleteReducer,
  blogUpdate: blogUpdateReducer,
  commentPost: commentPostReducer,
  commentList: commentListReducer,
  commentUpdate: commentUpdateReducer,
  commentDelete: commentDeleteReducer,
});

const initialState = {
  userLogin: { userAuthInfo: TokenService.getUser() },
};

const reduxStore = configureStore({ reducer, preloadedState: initialState });

export default reduxStore;
