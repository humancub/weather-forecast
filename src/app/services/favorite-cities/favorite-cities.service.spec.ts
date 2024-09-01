import { TestBed } from '@angular/core/testing';
import { FavoriteCitiesService } from './favorite-cities.service';

describe('FavoriteCitiesService', () => {
  let service: FavoriteCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteCitiesService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if no favorite cities are stored', () => {
    expect(service.getFavoriteCities()).toEqual([]);
  });

  it('should return stored favorite cities', () => {
    const cities = ['City1', 'City2'];
    localStorage.setItem('favoriteCities', JSON.stringify(cities));
    expect(service.getFavoriteCities()).toEqual(cities);
  });

  it('should add a city to favorite cities', () => {
    service.addCity('City1');
    expect(service.getFavoriteCities()).toEqual(['City1']);
  });

  it('should not add a city if it already exists in favorite cities', () => {
    service.addCity('City1');
    service.addCity('City1');
    expect(service.getFavoriteCities()).toEqual(['City1']);
  });

  it('should remove a city from favorite cities', () => {
    service.addCity('City1');
    service.addCity('City2');
    service.removeCity('City1');
    expect(service.getFavoriteCities()).toEqual(['City2']);
  });

  it('should clear all favorite cities', () => {
    service.addCity('City1');
    service.addCity('City2');
    service.clearFavoriteCities();
    expect(service.getFavoriteCities()).toEqual([]);
  });

  it('should emit favorite cities when a city is added', () => {
    const spy = jasmine.createSpy('favoriteCitiesObserver');
    service.getFavoriteCities$().subscribe(spy);

    service.addCity('City1');
    expect(spy).toHaveBeenCalledWith(['City1']);
  });

  it('should emit favorite cities when a city is removed', () => {
    const spy = jasmine.createSpy('favoriteCitiesObserver');
    service.addCity('City1');
    service.getFavoriteCities$().subscribe(spy);

    service.removeCity('City1');
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('should emit empty array when favorite cities are cleared', () => {
    const spy = jasmine.createSpy('favoriteCitiesObserver');
    service.addCity('City1');
    service.getFavoriteCities$().subscribe(spy);

    service.clearFavoriteCities();
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('should correctly check if a city is favorite', () => {
    service.addCity('City1');
    expect(service.isCityFavorite('City1')).toBeTrue();
    expect(service.isCityFavorite('City2')).toBeFalse();
  });
});
