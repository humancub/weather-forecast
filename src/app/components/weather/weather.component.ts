import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared';
import {
  WeatherService,
  ErrorHandlerService,
  FavoriteCitiesService,
  GeolocationService,
} from '../../services';
import { getWeatherIcon } from '../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    RouterModule,
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherData: any[] = [];
  todayWeather: any = null;
  cityControl = new FormControl('');
  cityName: string = '';

  private weatherService = inject(WeatherService);
  private errorHandler = inject(ErrorHandlerService);
  private favoriteCitiesService = inject(FavoriteCitiesService);
  private geolocationService = inject(GeolocationService);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.getCurrentLocationWeather();
  }

  getCurrentLocationWeather() {
    this.geolocationService.getUserLocation().subscribe({
      next: (position) => {
        console.log('Geolocation success:', position);
        const { latitude, longitude } = position.coords;
        this.weatherService.getWeatherByCoords(latitude, longitude).subscribe({
          next: (data: any) => {
            console.log('Weather data by coords:', data);
            this.cityName = data.city.name;
            this.weatherData = this.getFiveDayForecast(data.list);
            this.todayWeather = data.list[0];
          },
          error: (error: any) => {
            console.error('Weather API error:', error);
            this.errorHandler.handleError(error);
          },
        });
      },
      error: (error) => {
        console.error('Geolocation error:', error);
        this.errorHandler.handleError(
          new Error('Unable to retrieve your location.')
        );
      },
    });
  }

  searchWeather() {
    const city = this.cityControl.value || '';

    if (city) {
      this.weatherService.getWeather(city).subscribe({
        next: (data: any) => {
          console.log('Weather data by city:', data);
          this.cityName = data.city.name;
          this.weatherData = this.getFiveDayForecast(data.list);
          this.todayWeather = data.list[0];
        },
        error: (error: any) => {
          console.error('Weather API error:', error);
          this.errorHandler.handleError(error);
        },
      });
    } else {
      this.errorHandler.handleError(new Error('Please enter a city name.'));
    }
  }

  addToFavorites() {
    if (this.cityName) {
      this.favoriteCitiesService.addCity(this.cityName);
      this.snackBar.open(`${this.cityName} added to favorites`, 'Close', {
        duration: 3000,
      });
    } else {
      this.favoriteCitiesService.addCity(this.cityName);
      this.snackBar.open(`${this.cityName} added to favorites`, 'Close', {
        duration: 3000,
      });
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

    const forecast = Array.from(forecastMap.values()).slice(1, 6);
    return forecast;
  }

  getWeatherIcon(iconCode: string): string {
    return getWeatherIcon(iconCode);
  }
}
