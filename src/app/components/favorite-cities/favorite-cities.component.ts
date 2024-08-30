import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteCitiesService } from '../../services/favorite-cities.service';
import { WeatherService } from '../../services/weather.service';
import { getWeatherIcon } from '../../utils';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorite-cities',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.scss']
})
export class FavoriteCitiesComponent {
  favoriteCities: string[] = [];
  weatherData: { [key: string]: any } = {};

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
    this.favoriteCities.forEach(city => {
      this.weatherService.getWeather(city).subscribe(data => {
        this.weatherData[city] = data.list[0];
      });
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
