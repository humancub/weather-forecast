import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteCitiesService, WeatherService } from '../../services';
import { getWeatherIcon } from '../../utils';
import { SharedModule, ToolbarComponent } from '../../shared';
import { RouterModule } from '@angular/router';
import { FavoriteCity } from '../../models';

@Component({
  selector: 'app-favorite-cities',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, ToolbarComponent],
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.scss'],
})
export class FavoriteCitiesComponent {
  public favoriteCities: string[] = [];
  public weatherData: { [key: string]: any } = {};

  private favoriteCitiesService = inject(FavoriteCitiesService);
  private weatherService = inject(WeatherService);

  ngOnInit(): void {
    this.loadFavoriteCities();
    this.loadWeatherData();
  }

  loadFavoriteCities(): void {
    this.favoriteCities = this.favoriteCitiesService.getFavoriteCities();
  }

  loadWeatherData(): void {
    this.favoriteCities.forEach((city) => {
      const cityName =
        typeof city === 'object' && (city as FavoriteCity).name
          ? (city as FavoriteCity).name
          : city;

      if (typeof cityName === 'string') {
        this.weatherService.getWeather(cityName).subscribe((data) => {
          this.weatherData[cityName] = data.list[0];
        });
      }
    });
  }

  removeCity(city: string): void {
    this.favoriteCitiesService.removeCity(city);
    delete this.weatherData[city];
    this.loadFavoriteCities();
  }

  getWeatherIcon(iconCode: string): string {
    return getWeatherIcon(iconCode);
  }
}
