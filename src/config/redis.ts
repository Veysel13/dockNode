import Redis from "ioredis";

const redis = new Redis({
  host: "redis",  // Docker'daki servis ismi
  port: 6379,     // Redis varsayılan portu
});

redis.on("connect", () => {
  console.log("🚀 Connected to Redis!");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redis;
