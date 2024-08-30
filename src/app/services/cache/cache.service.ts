import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private defaultCacheDuration = 3600000;

  setCache(
    key: string,
    data: any,
    duration: number = this.defaultCacheDuration
  ): void {
    const expires = Date.now() + duration;
    const cacheData = { data, expires };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  getCache(key: string): any | null {
    const cacheData = localStorage.getItem(key);
    if (!cacheData) {
      return null;
    }

    const parsedData = JSON.parse(cacheData);
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
