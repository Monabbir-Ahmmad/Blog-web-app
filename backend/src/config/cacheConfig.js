import NodeCache from "node-cache";

export const cache = new NodeCache({
  stdTTL: 10,
  checkperiod: 0,
  deleteOnExpire: true,
  useClones: false,
});
