import dotenv from "dotenv";
import { FileCache } from "./providers/FileCache";
import { RedisCache } from "./providers/RedisCache";
import { ICache } from "./providers/ICache";
import { MemCache } from "./providers/MemCache";

dotenv.config();

const CACHE_DRIVER = process.env.CACHE_DRIVER || "file";

class CacheManager {
  private cacheProvider: ICache;

  constructor() {
    if (CACHE_DRIVER === "redis") {
      this.cacheProvider = new RedisCache();
    }else if (CACHE_DRIVER === "mem") {
      this.cacheProvider = new MemCache();
    }else {
      this.cacheProvider = new FileCache();
    }
  }

  getProvider(): ICache {
    return this.cacheProvider;
  }
}

export const cache = new CacheManager().getProvider();
