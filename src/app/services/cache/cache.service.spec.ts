import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and retrieve cached data', () => {
    const key = 'testKey';
    const data = { name: 'test' };
    service.setCache(key, data);

    const result = service.getCache(key);
    expect(result).toEqual(data);
  });

  it('should return null if cache is expired', () => {
    const key = 'testKey';
    const data = { name: 'test' };
    service.setCache(key, data, -1000);

    const result = service.getCache(key);
    expect(result).toBeNull();
  });

  it('should remove cache item', () => {
    const key = 'testKey';
    const data = { name: 'test' };
    service.setCache(key, data);

    service.clearCache(key);
    const result = service.getCache(key);
    expect(result).toBeNull();
  });

  it('should clear all cache items', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const data1 = { name: 'test1' };
    const data2 = { name: 'test2' };

    service.setCache(key1, data1);
    service.setCache(key2, data2);

    service.clearAllCache();

    expect(service.getCache(key1)).toBeNull();
    expect(service.getCache(key2)).toBeNull();
  });
});
