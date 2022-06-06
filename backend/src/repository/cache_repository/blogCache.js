import { cache } from "../../config/cacheConfig.js";

const blogKey = "blogId";
const userBlogListKey = "userBlogIds";

const cacheBlogById = (blogId, blogData) => {
  const result = cache.set(blogKey + blogId, blogData);
  console.log(result ? "Blog cached" : "Blog caching failed");
  return result;
};

const getBlogById = async (blogId, callback) => {
  let blog = cache.get(blogKey + blogId);
  if (blog?.id) {
    console.log("Blog cache hit");
    return blog;
  }

  console.log("Blog cache miss");
  blog = await callback();
  cacheBlogById(blogId, blog);
  return blog;
};

const deleteBlogById = (blogId) => {
  const blog = cache.take(blogKey + blogId);
  if (blog) {
    console.log("Blog removed from cache.");
  }
  return blog;
};

const cacheBlogList = (blogList = []) => {
  blogList = blogList.map((blog) => {
    return { key: blogKey + blog?.id, val: blog };
  });

  const result = cache.mset(blogList);
  console.log(result ? "Blog list cached" : "Blog list caching failed");
  return result;
};

const getBlogListByIds = async (blogIds = []) => {
  let blogList = [];

  if (blogIds?.length) {
    blogIds.forEach((id) => {
      const blog = cache.get(blogKey + id);
      blog?.id && blogList.push(blog);
    });
  }

  if (blogList?.length && blogList?.length === blogIds?.length) {
    return blogList;
  }

  return undefined;
};

const cacheUserBlogList = (userId, blogList = []) => {
  const result = cache.set(
    userBlogListKey + userId,
    blogList.map((blog) => blog?.id),
    30
  );

  const listResult = cacheBlogList(blogList);

  console.log(
    result && listResult
      ? "User blog ids cached"
      : "User blog ids caching failed"
  );
  return result && listResult;
};

const getUserBlogList = async (userId, callback) => {
  const userBlogIdList = cache.get(userBlogListKey + userId);
  let blogList = [];

  blogList = await getBlogListByIds(userBlogIdList);

  if (blogList?.length && blogList?.length == userBlogIdList?.length) {
    console.log("User blog list cache hit");
    return blogList;
  }

  console.log("User blog list cache miss");
  blogList = await callback();
  cacheUserBlogList(userId, blogList);
  return blogList;
};

export default {
  cacheBlogById,
  getBlogById,
  deleteBlogById,
  cacheUserBlogList,
  getUserBlogList,
  cacheBlogList,
  getBlogListByIds,
};
