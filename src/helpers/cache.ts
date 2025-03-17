import redis from "../config/redis";


export async function hasCache(key: string): Promise<boolean> {
  const exists = await redis.exists(key);
  return exists === 1;
}

export async function getCache<T>(key: string): Promise<T | null> {
  const cachedData = await redis.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
}


export async function putCache<T>(key: string, value: T, ttl: number = 300): Promise<void> {
  await redis.setex(key, ttl, JSON.stringify(value));
  console.log(`💾 Cache'e kaydedildi: ${key}`);
}

export async function forgetCache(key: string): Promise<void> {
  await redis.del(key);
  console.log(`🗑️ Cache silindi: ${key}`);
}

export async function flushCache(): Promise<void> {
  await redis.flushall();
  console.log(`🚀 Tüm cache temizlendi!`);
}


export async function cacheRemember<T>(
  key: string, ttl: number, fetchFunction: () => Promise<T>
): Promise<T> {
  const cachedData = await getCache<T>(key);
  if (cachedData) {
    console.log(`✅ Cache'ten getirildi: ${key}`);
    return cachedData;
  }

  const data = await fetchFunction();
  await putCache(key, data, ttl);
  return data;
}
