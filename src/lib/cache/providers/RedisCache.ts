import redis from "../../../config/redis";
import { ICache } from "./ICache";


export class RedisCache implements ICache {
  async has(key: string): Promise<boolean> {
    const exists = await redis.exists(key);
    return exists === 1;
  }

  async get<T>(key: string): Promise<T | null> {
    const cachedData = await redis.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  async put<T>(key: string, value: T, ttl: number = 300): Promise<void> {
    await redis.setex(key, ttl, JSON.stringify(value));
    console.log(`💾 Redis cache'e kaydedildi redis: ${key}`);
  }

  async forget(key: string): Promise<void> {
    await redis.del(key);
    console.log(`🗑️ Redis cache silindi: ${key}`);
  }

  async flush(): Promise<void> {
    await redis.flushall();
    console.log(`🚀 Redis cache temizlendi!`);
  }

  async remember<T>(key: string, ttl: number, fetchFunction: () => Promise<T>): Promise<T> {
    const cachedData = await this.get<T>(key);
    if (cachedData) {
      console.log(`✅ Cache'ten getirildi redis: ${key}`);
      return cachedData;
    }
  
    const data = await fetchFunction();
    await this.put(key, data, ttl);
    return data;
  }
}
