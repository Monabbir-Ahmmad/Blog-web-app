export const randomColor = () => {
  let hex = Math.ceil(Math.random() * 0xffffff);
  return "#" + hex.toString(16);
};
