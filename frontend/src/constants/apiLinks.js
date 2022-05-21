//Host of the api
export const API_HOST = "http://localhost:5000";

export const POST_USER_REGISTER = `${API_HOST}/api/v1/user/signup`;

export const POST_USER_LOGIN = `${API_HOST}/api/v1/user/signin`;

export const GET_USER_PROFILE = `${API_HOST}/api/v1/user/profile`;

export const UPDATE_USER_PROFILE = `${API_HOST}/api/v1/user/profile`;

export const POST_BLOG = `${API_HOST}/api/v1/blog/create`;

export const UPDATE_BLOG = `${API_HOST}/api/v1/blog/update`;

export const GET_SINGLE_BLOG = `${API_HOST}/api/v1/blog`;

export const UPVOTE_BLOG = `${API_HOST}/api/v1/blog/like`;

export const POST_BLOG_COMMENT = `${API_HOST}/api/v1/blog/comment`;

export const GET_BLOG_COMMENTS = `${API_HOST}/api/v1/blog/comment`;
