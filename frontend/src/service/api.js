import {
  API_HOST,
  POST_REFRESH_TOKEN,
  POST_USER_LOGIN,
  POST_USER_REGISTER,
} from "../constants/apiLinks";

import TokenService from "./token.service";
import { USER_LOGOUT } from "../constants/authConstants";
import axios from "axios";
import reduxStore from "../reduxStore";

const api = (contentType = "application/json") => {
  const instance = axios.create({
    baseURL: `${API_HOST}/api`,
    headers: {
      "Content-Type": contentType,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (
        originalConfig.url !== POST_USER_LOGIN &&
        originalConfig.url !== POST_USER_REGISTER &&
        originalConfig.url !== POST_REFRESH_TOKEN &&
        err.response
      ) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await instance.post(POST_REFRESH_TOKEN, {
              refreshToken: TokenService.getLocalRefreshToken(),
            });
            const { accessToken } = rs.data;

            TokenService.updateLocalAccessToken(accessToken);

            return instance(originalConfig);
          } catch (_error) {
            //Refresh token was expired
            TokenService.removeUser();

            reduxStore.dispatch({
              type: USER_LOGOUT,
            });

            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );

  return instance;
};

export default api;
