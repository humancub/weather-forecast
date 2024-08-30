import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should cache data and retrieve it before expiration', () => {
    const key = 'testKey';
    const data = { value: 'testData' };

    service.setCache(key, data, 60000);
    const cachedData = service.getCache(key);
    expect(cachedData).toEqual(data);
  });

  it('should return null if cache is expired', (done) => {
    const key = 'testKey';
    const data = { value: 'testData' };

    service.setCache(key, data, 100);

    setTimeout(() => {
      const cachedData = service.getCache(key);
      expect(cachedData).toBeNull();
      done();
    }, 200);
  });

  it('should remove expired cache from localStorage', (done) => {
    const key = 'testKey';
    const data = { value: 'testData' };

    service.setCache(key, data, 100);

    setTimeout(() => {
      service.getCache(key);
      const localStorageData = localStorage.getItem(key);
      expect(localStorageData).toBeNull();
      done();
    }, 200);
  });

  it('should clear specific cache', () => {
    const key = 'testKey';
    const data = { value: 'testData' };

    service.setCache(key, data, 60000);
    service.clearCache(key);
    const cachedData = service.getCache(key);
    expect(cachedData).toBeNull();
  });

  it('should clear all cache', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const data = { value: 'testData' };

    service.setCache(key1, data, 60000);
    service.setCache(key2, data, 60000);
    service.clearAllCache();
    const cachedData1 = service.getCache(key1);
    const cachedData2 = service.getCache(key2);
    expect(cachedData1).toBeNull();
    expect(cachedData2).toBeNull();
  });
});
