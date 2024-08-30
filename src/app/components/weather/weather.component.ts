import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared';
import { WeatherService, ErrorHandlerService, FavoriteCitiesService } from '../../services';
import { getWeatherIcon } from '../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, SharedModule, RouterModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  weatherData: any[] = [];
  todayWeather: any = null;
  cityControl = new FormControl('');
  cityName: string = '';

  private weatherService = inject(WeatherService);
  private errorHandler = inject(ErrorHandlerService);
  private favoriteCitiesService = inject(FavoriteCitiesService);
  private snackBar = inject(MatSnackBar);

  searchWeather() {
    const city = this.cityControl.value || '';

    if (city) {
      this.weatherService.getWeather(city).subscribe({
        next: (data: any) => {
          this.cityName = data.city.name;
          this.weatherData = this.getFiveDayForecast(data.list);
          this.todayWeather = data.list[0];
        },
        error: (error: any) => {
          this.errorHandler.handleError(error);
        }
      });
    } else {
      this.errorHandler.handleError(new Error('Please enter a city name.'));
    }
  }

  addToFavorites() {
    if (this.cityName) {
      this.favoriteCitiesService.addCity(this.cityName);
      this.snackBar.open(`${this.cityName} added to favorites`, 'Close', { duration: 3000 });
    }
    else {
      this.favoriteCitiesService.addCity(this.cityName);
      this.snackBar.open(`${this.cityName} added to favorites`, 'Close', { duration: 3000 });
    }
  }

  getFiveDayForecast(list: any[]) {
    const forecastMap = new Map();

    list.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!forecastMap.has(date)) {
        forecastMap.set(date, item);
      }
    });

    const forecast = Array.from(forecastMap.values()).slice(1, 7);
    return forecast;
  }

  getWeatherIcon(iconCode: string): string {
    return getWeatherIcon(iconCode);
  }
}
