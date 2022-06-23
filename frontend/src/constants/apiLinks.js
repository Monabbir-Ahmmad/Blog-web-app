//Host of the api
export const API_HOST = "http://localhost:5000";

export const POST_USER_REGISTER = `${API_HOST}/api/v1/user/signup`;

export const POST_USER_LOGIN = `${API_HOST}/api/v1/user/signin`;

export const GET_USER_PROFILE = `${API_HOST}/api/v1/user/profile`;

export const UPDATE_USER_PROFILE = `${API_HOST}/api/v1/user/profile`;

export const UPDATE_USER_PASSWORD = `${API_HOST}/api/v1/user/profile`;

export const POST_BLOG = `${API_HOST}/api/v1/blog/create`;

export const UPDATE_BLOG = `${API_HOST}/api/v1/blog/update`;

export const GET_SINGLE_BLOG = `${API_HOST}/api/v1/blog/find`;

export const GET_BLOG_LIST = `${API_HOST}/api/v1/blog/search`;

export const GET_PERSONAL_BLOG_LIST = `${API_HOST}/api/v1/blog/personal`;

export const POST_BLOG_LIKE = `${API_HOST}/api/v1/blog/like`;

export const POST_BLOG_COMMENT = `${API_HOST}/api/v1/blog/comment`;

export const DELETE_PERSONAL_BLOG = `${API_HOST}/api/v1/blog/delete`;

export const GET_BLOG_COMMENTS = `${API_HOST}/api/v1/blog/comment`;
