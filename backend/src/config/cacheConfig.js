import NodeCache from "node-cache";
import dotenv from "dotenv";

dotenv.config();

export const cache = new NodeCache({
  stdTTL: process.env.CACHE_TTL,
  checkperiod: process.env.CACHE_CHECK_PERIOD,
  deleteOnExpire: true,
  useClones: false,
});
