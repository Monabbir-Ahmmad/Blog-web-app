import { cache } from "../../config/cacheConfig.js";

const userKey = "userId";

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

export default { cacheUserById, getUserById };
