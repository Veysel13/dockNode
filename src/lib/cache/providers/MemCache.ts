import memjs from "memjs";
import { ICache } from "./ICache";


export class MemCache implements ICache {
  private memcached:any
  constructor() {
     this.memcached = memjs.Client.create("memcached:11211");
  }

  async has(key: string): Promise<boolean> {
    const data = await this.memcached.get(key);
    return !!data.value;
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.memcached.get(key);
  return data.value ? JSON.parse(data.value.toString()) : null;
  }

  async put<T>(key: string, value: T, ttl: number = 300): Promise<void> {
    await this.memcached.set(key, JSON.stringify(value), { expires: ttl });
    console.log(`💾 Mem cache'e kaydedildi: ${key}`);
  }

  async forget(key: string): Promise<void> {
    await this.memcached.delete(key);
    console.log(`🗑️ Mem cache silindi: ${key}`);
  }

  async flush(): Promise<void> {
    await this.memcached.flush();
    console.log(`🚀 Mem cache temizlendi!`);
  }

  async remember<T>(key: string, ttl: number, fetchFunction: () => Promise<T>): Promise<T> {
    const cachedData = await this.get<T>(key);
    if (cachedData) {
      console.log(`✅ Cache'ten getirildi mem: ${key}`);
      return cachedData;
    }
  
    const data = await fetchFunction();
    await this.put(key, data, ttl);
    return data;
  }
}
