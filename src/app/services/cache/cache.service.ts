import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private defaultCacheDuration = 3600000;

  setCache<T>(
    key: string,
    data: T,
    duration: number = this.defaultCacheDuration
  ): void {
    const expires = Date.now() + duration;
    const cacheData: CacheData<T> = { data, expires };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  getCache<T>(key: string): T | null {
    const cacheData = localStorage.getItem(key);
    if (!cacheData) {
      return null;
    }

    const parsedData: CacheData<T> = JSON.parse(cacheData);
    if (Date.now() > parsedData.expires) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedData.data;
  }

  clearCache(key: string): void {
    localStorage.removeItem(key);
  }

  clearAllCache(): void {
    localStorage.clear();
  }
}

interface CacheData<T> {
  data: T;
  expires: number;
}
