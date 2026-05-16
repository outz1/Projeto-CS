import { Redis } from "@upstash/redis";

type RedisSetOptions = {
  ex?: number;
};

type RedisLike = {
  keys(pattern: string): Promise<string[]>;
  get<T = unknown>(key: string): Promise<T | null>;
  set(key: string, value: unknown, options?: RedisSetOptions): Promise<unknown>;
  del(key: string): Promise<number>;
  exists(key: string): Promise<number>;
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<number>;
  ttl(key: string): Promise<number>;
};

type MemoryEntry = {
  value: unknown;
  expiresAt?: number;
};

const redisUrl = process.env.SNAKEGAME_KV_REST_API_URL;
const redisToken = process.env.SNAKEGAME_KV_REST_API_TOKEN;

function hasProductionRedisConfig() {
  return Boolean(
    redisUrl &&
      redisToken &&
      !redisUrl.includes("example-upstash-url") &&
      !redisToken.includes("replace-with-upstash-token"),
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createMemoryRedis(): RedisLike {
  const store = new Map<string, MemoryEntry>();

  function isExpired(entry: MemoryEntry) {
    return typeof entry.expiresAt === "number" && Date.now() > entry.expiresAt;
  }

  function readEntry(key: string) {
    const entry = store.get(key);
    if (!entry) return null;
    if (isExpired(entry)) {
      store.delete(key);
      return null;
    }
    return entry;
  }

  function patternToRegExp(pattern: string) {
    const source = pattern.split("*").map(escapeRegExp).join(".*");
    return new RegExp(`^${source}$`);
  }

  return {
    async keys(pattern) {
      const regex = patternToRegExp(pattern);
      return Array.from(store.keys()).filter((key) => readEntry(key) && regex.test(key));
    },

    async get<T = unknown>(key: string) {
      return (readEntry(key)?.value ?? null) as T | null;
    },

    async set(key, value, options) {
      store.set(key, {
        value,
        expiresAt: options?.ex ? Date.now() + options.ex * 1000 : undefined,
      });
      return "OK";
    },

    async del(key) {
      return store.delete(key) ? 1 : 0;
    },

    async exists(key) {
      return readEntry(key) ? 1 : 0;
    },

    async incr(key) {
      const current = Number(readEntry(key)?.value ?? 0) + 1;
      const previousEntry = readEntry(key);
      store.set(key, {
        value: current,
        expiresAt: previousEntry?.expiresAt,
      });
      return current;
    },

    async expire(key, seconds) {
      const entry = readEntry(key);
      if (!entry) return 0;
      store.set(key, { ...entry, expiresAt: Date.now() + seconds * 1000 });
      return 1;
    },

    async ttl(key) {
      const entry = readEntry(key);
      if (!entry) return -2;
      if (!entry.expiresAt) return -1;
      return Math.max(0, Math.ceil((entry.expiresAt - Date.now()) / 1000));
    },
  };
}

export const redis: RedisLike = hasProductionRedisConfig()
  ? new Redis({
      url: redisUrl!,
      token: redisToken!,
    })
  : createMemoryRedis();

if (!hasProductionRedisConfig()) {
  console.warn("[redis] Usando storage em memória. Configure SNAKEGAME_KV_REST_API_URL e SNAKEGAME_KV_REST_API_TOKEN para persistência real.");
}

export function monthKey() {
  const d = new Date();
  return `snake:${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
