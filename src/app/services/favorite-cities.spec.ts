import { TestBed } from '@angular/core/testing';
import { FavoriteCitiesService } from './favorite-cities.service';

describe('FavoriteCitiesService', () => {
  let service: FavoriteCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteCitiesService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty list if no cities are saved', () => {
    const cities = service.getFavoriteCities();
    expect(cities).toEqual([]);
  });

  it('should add a city to the favorites list', () => {
    service.addCity('New York');
    const cities = service.getFavoriteCities();
    expect(cities).toContain('New York');
  });

  it('should not add the same city more than once', () => {
    service.addCity('New York');
    service.addCity('New York');
    const cities = service.getFavoriteCities();
    expect(cities.length).toBe(1); 
  });

  it('should remove a city from the favorites list', () => {
    service.addCity('New York');
    service.addCity('Los Angeles');
    service.removeCity('New York');
    const cities = service.getFavoriteCities();
    expect(cities).not.toContain('New York');
    expect(cities).toContain('Los Angeles');
  });

  it('should clear all favorite cities', () => {
    service.addCity('New York');
    service.addCity('Los Angeles');
    service.clearFavoriteCities();
    const cities = service.getFavoriteCities();
    expect(cities).toEqual([]);
  });
});
