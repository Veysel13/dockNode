import dotenv from "dotenv";
import { FileCache } from "./providers/FileCache";
import { RedisCache } from "./providers/RedisCache";
import { ICache } from "./providers/ICache";
import { MemCache } from "./providers/MemCache";
import { MemoryCache } from "./providers/MemoryCache";

dotenv.config();

const CACHE_DRIVER = process.env.CACHE_DRIVER || "file";

class CacheManager {
  private cacheProvider: ICache;

  constructor() {
    if (CACHE_DRIVER === "redis") {
      this.cacheProvider = new RedisCache();
    }else if (CACHE_DRIVER === "mem") {
      this.cacheProvider = new MemCache();
    }else if (CACHE_DRIVER === "memory") {
      this.cacheProvider = new MemoryCache();
    }else {
      this.cacheProvider = new FileCache();
    }
  }

  getProvider(): ICache {
    return this.cacheProvider;
  }
}

export const cache = new CacheManager().getProvider();


/*
Özellik	File Cache 🗂	Redis 🔴	Memcached 🟢	Memory Cache ⚡

Açıklama	

Dosya tabanlı cache, disk üzerine kayıt eder.	
RAM üzerinde çalışan, hızlı ve kalıcı cache sistemi.	
RAM üzerinde çalışan, yüksek hızlı geçici cache.	
Uygulama belleğinde çalışan cache.

Hız	

Yavaş (Disk I/O)	
Çok hızlı (RAM)	
Çok hızlı (RAM)	
En hızlı (RAM, ancak uygulama ile sınırlı)

Veri Kalıcılığı	

Kalıcı (Diskte saklanır)	
Kalıcı (Persisted Mode ile)	
Geçici (Sunucu kapanınca silinir)	
Geçici (Uygulama kapanınca silinir)

Paylaşımlı Kullanım	

Hayır (Lokal)	
Evet (Merkezi cache)	
Evet (Merkezi cache)	
Hayır (Sadece uygulama içi)


TTL (Süre Aşımı Desteği)	

Manuel olarak programlanmalı	
Evet	
Evet	
Evet


Kullanım Alanı	
Küçük ölçekli projeler, lokal cache	
Büyük projeler, dağıtık sistemler, oturum yönetimi	
Kısa süreli hızlı cache ihtiyacı, load balancing	
Küçük ölçekli, tek sunuculu uygulamalar


✅ File Cache: Küçük ölçekli projelerde disk tabanlı veri saklama için.
✅ Redis: Büyük ölçekli projelerde oturum yönetimi, kuyruk sistemleri, yüksek hızlı veri erişimi için.
✅ Memcached: Kısa süreli büyük veri cache işlemleri için (örneğin API yanıtları, token saklama).
✅ Memory Cache: Tek sunuculu projelerde en hızlı cache çözümü olarak (geçici veri saklama).

*/
