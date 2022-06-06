export const paginate = (arr = [], page = 1, limit = 1) => {
  return arr.filter((item, index) => {
    return index >= limit * (page - 1) && index < limit + limit * (page - 1);
  });
};
