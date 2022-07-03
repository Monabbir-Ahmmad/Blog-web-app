import { cache } from "../../config/cacheConfig.js";

const userKey = "userId";

const userIdArrayKey = (page, limit, sort, keyword) => {
  return `user_p${page}_l${limit}_s${sort}_k${keyword}`;
};

const cacheUserById = (userId, userData) => {
  const result = cache.set(userKey + userId, userData);
  console.log(result ? "User cached" : "User caching failed");
  return result;
};

const getUserById = async (userId, callback) => {
  let user = cache.get(userKey + userId);
  if (user?.id) {
    console.log("User cache hit");
    return user;
  }

  console.log("User cache miss");
  user = await callback();
  cacheUserById(userId, user);
  return user;
};

const cacheUserIdArray = (keyword, keyNumber, userIdArray = []) => {
  const result = cache.set(keyword + keyNumber, userIdArray);
  console.log(result ? "User id array cached" : "User id array caching failed");
  return result;
};

const getUserIdArray = (keyword, keyNumber) => {
  const result = cache.get(keyword + keyNumber);
  console.log(result ? "User id array cache hit" : "User id array cache miss");
  return result;
};

const cacheUserList = (userList = []) => {
  userList = userList.map((user) => {
    return { key: userKey + user?.id, val: user };
  });

  const result = cache.mset(userList);
  console.log(result ? "User list cached" : "User list caching failed");
  return result;
};

const getUserListByIds = async (userIdArray = []) => {
  const userList = [];

  if (userIdArray?.length) {
    userIdArray.forEach((id) => {
      const user = cache.get(userKey + id);
      user?.id && userList.push(user);
    });
  }

  if (userList?.length && userList?.length === userIdArray?.length) {
    console.log("user list cache hit");
    return userList;
  }

  console.log("User list cache miss");
  return null;
};

const cacheUsers = (page, limit, sort, keyword, userList) => {
  const key = userIdArrayKey(page, limit, sort, keyword);

  const result = cacheUserIdArray(
    key,
    0,
    userList.map((user) => user?.id)
  );

  const listResult = cacheUserList(userList);

  return result && listResult;
};

const getUserList = async (page, limit, sort, keyword, callback) => {
  const userIdArray = getUserIdArray(
    userIdArrayKey(page, limit, sort, keyword),
    0
  );

  let userList = [];

  userList = await getUserListByIds(userIdArray);

  if (userList?.length) {
    return userList;
  }

  userList = await callback();
  cacheUsers(page, limit, sort, keyword, userList);
  return userList;
};

export default { cacheUserById, getUserById, getUserList };
