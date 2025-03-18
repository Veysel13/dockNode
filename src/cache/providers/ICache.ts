export interface ICache {
     has(key: string): Promise<boolean>;
     get<T>(key: string): Promise<T | null>;
     put<T>(key: string, value: T, ttl?: number): Promise<void>;
     forget(key: string): Promise<void>;
     flush(): Promise<void>;
     remember<T>(key: string, ttl: number, fetchFunction: () => Promise<T>):Promise<T>
  }