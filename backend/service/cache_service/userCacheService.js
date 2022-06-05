import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 10 });

const cacheUserById = (userId, userData) => {
  const result = cache.set("userId" + userId, userData);
  console.log(result ? "User cached" : "User caching failed");
  return result;
};

const getUserById = (userId) => {
  const user = cache.get("userId" + userId);
  console.log(user ? "User cache hit" : "User cache miss");
  return user;
};

export default { cacheUserById, getUserById };
