import fs from "fs/promises";
import path from "path";
import { ICache } from "./ICache";

const CACHE_DIR = path.join(__dirname, "../../storage/cache");

export class FileCache implements ICache {
  constructor() {
    fs.mkdir(CACHE_DIR, { recursive: true }).catch(console.error);
  }

  async has(key: string): Promise<boolean> {
    try {
        const filePath = path.join(CACHE_DIR, key);
        const data = await fs.readFile(filePath, "utf-8");
        const { expiresAt } = JSON.parse(data);
  
    
        if (Date.now() > expiresAt) {
          await this.forget(key);
          return false;
        }
  
        return true;
      } catch {
        return false;
      }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
        const filePath = path.join(CACHE_DIR, key);
        const data = await fs.readFile(filePath, "utf-8");
        const { value, expiresAt } = JSON.parse(data);
  
        // Eğer TTL süresi dolmuşsa, cache'i sil ve null döndür
        if (Date.now() > expiresAt) {
          await this.forget(key);
          return null;
        }
  
        return value;
      } catch {
        return null;
      }
  }

  async put<T>(key: string, value: T, ttl: number = 300): Promise<void> {
    const expiresAt = Date.now() + ttl * 1000;
    const data = JSON.stringify({ value, expiresAt });

    await fs.writeFile(path.join(CACHE_DIR, key), data);
    console.log(`💾 Dosya cache'e kaydedildi: ${key}`);
  }

  async forget(key: string): Promise<void> {
    await fs.unlink(path.join(CACHE_DIR, key)).catch(() => {});
    console.log(`🗑️ Dosya cache silindi: ${key}`);
  }

  async flush(): Promise<void> {
    await fs.rm(CACHE_DIR, { recursive: true, force: true });
    await fs.mkdir(CACHE_DIR, { recursive: true });
    console.log(`🚀 Dosya cache temizlendi!`);
  }

  async remember<T>(key: string, ttl: number, fetchFunction: () => Promise<T>): Promise<T> {
    const cachedData = await this.get<T>(key);
    if (cachedData) {
      console.log(`✅ Cache'ten getirildi file: ${key}`);
      return cachedData;
    }
  
    const data = await fetchFunction();
    await this.put(key, data, ttl);
    return data;
  }
}
