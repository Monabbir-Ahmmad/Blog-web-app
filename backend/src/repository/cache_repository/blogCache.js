import { cache } from "../../config/cacheConfig.js";

const blogKeyPrefix = "blogId";
const userBlogsKeyPrefix = "userBlogIds";
const blogIdArrayKeyPrefix = (page, limit, keyword = "") => {
  return `blog_p${page}_l${limit}_k${keyword}`;
};

const cacheBlogById = (blogId, blogData) => {
  const result = cache.set(blogKeyPrefix + blogId, blogData);
  console.log(result ? "Blog cached" : "Blog caching failed");
  return result;
};

const getBlogById = async (blogId, callback) => {
  let blog = cache.get(blogKeyPrefix + blogId);
  if (blog?.id) {
    console.log("Blog cache hit");
    return blog;
  }

  console.log("Blog cache miss");
  blog = await callback();
  cacheBlogById(blogId, blog);
  return blog;
};

const removeBlogById = (blogId) => {
  const blog = cache.take(blogKeyPrefix + blogId);
  if (blog) {
    console.log("Blog removed from cache.");
  }
  return blog;
};

const cacheBlogList = (blogList = []) => {
  blogList = blogList.map((blog) => {
    return { key: blogKeyPrefix + blog?.id, val: blog };
  });

  const result = cache.mset(blogList);
  console.log(result ? "Blog list cached" : "Blog list caching failed");
  return result;
};

const getBlogListByIds = async (blogIdArray = []) => {
  const blogList = [];

  if (blogIdArray?.length) {
    blogIdArray.forEach((id) => {
      const blog = cache.get(blogKeyPrefix + id);
      blog?.id && blogList.push(blog);
    });
  }

  if (blogList?.length && blogList?.length === blogIdArray?.length) {
    console.log("Blog list cache hit");
    return blogList;
  }

  console.log("Blog list cache miss");
  return null;
};

const cacheBlogIdArray = (keyPrefix, keyNumber, blogIdArray = []) => {
  const result = cache.set(keyPrefix + keyNumber, blogIdArray);
  console.log(result ? "Blog id array cached" : "Blog id array caching failed");
  return result;
};

const getBlogIdArray = (keyPrefix, keyNumber) => {
  const result = cache.get(keyPrefix + keyNumber);
  console.log(result ? "Blog id array cache hit" : "Blog id array cache miss");
  return result;
};

const cacheUserBlogList = (userId, page, limit, blogList = []) => {
  const keyPrefix = blogIdArrayKeyPrefix(page, limit, userBlogsKeyPrefix);
  const result = cacheBlogIdArray(
    keyPrefix,
    userId,
    blogList.map((blog) => blog?.id)
  );

  const listResult = cacheBlogList(blogList);

  return result && listResult;
};

const getUserBlogList = async (userId, page, limit, callback) => {
  const userBlogIdArray = getBlogIdArray(
    blogIdArrayKeyPrefix(page, limit, userBlogsKeyPrefix),
    userId
  );

  let blogList = [];

  blogList = await getBlogListByIds(userBlogIdArray);

  if (blogList?.length) {
    return blogList;
  }

  blogList = await callback();
  cacheUserBlogList(userId, page, limit, blogList);
  return blogList;
};

const cacheSearchedBlogs = (page, limit, keyword, blogList) => {
  const key = blogIdArrayKeyPrefix(page, limit, keyword);

  const result = cacheBlogIdArray(
    key,
    0,
    blogList.map((blog) => blog?.id)
  );

  const listResult = cacheBlogList(blogList);

  return result && listResult;
};

const getSearchedBlogs = async (page, limit, keyword, callback) => {
  const searchedBlogIdArray = getBlogIdArray(
    blogIdArrayKeyPrefix(page, limit, keyword),
    0
  );

  let blogList = [];

  blogList = await getBlogListByIds(searchedBlogIdArray);

  if (blogList?.length) {
    return blogList;
  }

  blogList = await callback();
  cacheSearchedBlogs(page, limit, keyword, blogList);
  return blogList;
};

export default {
  cacheBlogById,
  getBlogById,
  removeBlogById,
  cacheBlogList,
  getBlogListByIds,
  cacheUserBlogList,
  getUserBlogList,
  cacheSearchedBlogs,
  getSearchedBlogs,
};
