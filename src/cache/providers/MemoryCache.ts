import cache from "memory-cache";
import { ICache } from "./ICache";

export class MemoryCache implements ICache {
  constructor() {
   
  }

  async has(key: string): Promise<boolean> {
    return cache.get(key) !== null;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
        const cachedData = await cache.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
      } catch {
        return null;
      }
  }

  async put<T>(key: string, value: T, ttl: number = 300): Promise<void> {
    await cache.put(key, JSON.stringify(value), ttl * 1000);
    console.log(`💾 Dosya memory cache'e kaydedildi: ${key}`);
  }

  async forget(key: string): Promise<void> {
    await cache.del(key);
    console.log(`🗑️ Dosya memory cache silindi: ${key}`);
  }

  async flush(): Promise<void> {
    await cache.clear();
    console.log(`🚀 Dosya memory cache temizlendi!`);
  }

  async remember<T>(key: string, ttl: number, fetchFunction: () => Promise<T>): Promise<T> {
    const cachedData = await this.get<T>(key);    
    if (cachedData) {
      console.log(`✅ Cache'ten getirildi memory: ${key}`);
      return cachedData;
    }
  
    const data = await fetchFunction();
    await this.put(key, data, ttl);
    return data;
  }
}
