import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCitiesService {
  private storageKey = 'favoriteCities';

  getFavoriteCities(): string[] {
    const cities = localStorage.getItem(this.storageKey);
    return cities ? JSON.parse(cities) : [];
  }

  addCity(city: string): void {
    const cities = this.getFavoriteCities();
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem(this.storageKey, JSON.stringify(cities));
    }
  }

  removeCity(city: string): void {
    let cities = this.getFavoriteCities();
    cities = cities.filter((c) => c !== city);
    localStorage.setItem(this.storageKey, JSON.stringify(cities));
  }

  clearFavoriteCities(): void {
    localStorage.removeItem(this.storageKey);
  }
}
