import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { postBlogReducer } from "./reducers/blogReducer";
import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  postBlog: postBlogReducer,
});

const userAuthInfoFromStorage = localStorage.getItem("userAuthInfo")
  ? JSON.parse(localStorage.getItem("userAuthInfo"))
  : {};

const initialState = {
  userLogin: { userAuthInfo: userAuthInfoFromStorage },
};

const reduxStore = configureStore({ reducer, preloadedState: initialState });

export default reduxStore;
