import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCitiesService {
  private storageKey = 'favoriteCities';

  private favoriteCitiesSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>(this.getFavoriteCities());

  getFavoriteCities(): string[] {
    const cities = localStorage.getItem(this.storageKey);
    return cities ? JSON.parse(cities) : [];
  }

  getFavoriteCities$(): Observable<string[]> {
    return this.favoriteCitiesSubject.asObservable();
  }

  isCityFavorite(city: string): boolean {
    return this.getFavoriteCities().includes(city);
  }

  addCity(city: string): void {
    const cities = this.getFavoriteCities();
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem(this.storageKey, JSON.stringify(cities));
      this.favoriteCitiesSubject.next(cities);
    }
  }

  removeCity(city: string): void {
    let cities = this.getFavoriteCities();
    cities = cities.filter((c) => c !== city);
    localStorage.setItem(this.storageKey, JSON.stringify(cities));
    this.favoriteCitiesSubject.next(cities);
  }

  clearFavoriteCities(): void {
    localStorage.removeItem(this.storageKey);
    this.favoriteCitiesSubject.next([]);
  }
}
