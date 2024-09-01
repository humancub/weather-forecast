import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  englishLettersValidator,
  SharedModule,
  ToolbarComponent,
} from '../../shared';
import {
  WeatherService,
  ErrorHandlerService,
  FavoriteCitiesService,
  GeolocationService,
  CacheService,
} from '../../services';
import { getWeatherIcon } from '../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { WeatherData, WeatherResponse } from '../../models';

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
    ToolbarComponent,
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public weatherData: WeatherData[] = [];
  public todayWeather: WeatherData | null = null;
  public cityControl = new FormControl('', [
    Validators.required,
    englishLettersValidator(),
  ]);
  public cityName: string = '';
  public isFavorite: boolean = false;
  public isLoading: boolean = false;

  private weatherService = inject(WeatherService);
  private errorHandler = inject(ErrorHandlerService);
  private favoriteCitiesService = inject(FavoriteCitiesService);
  private geolocationService = inject(GeolocationService);
  private cacheService = inject(CacheService);
  private snackBar = inject(MatSnackBar);

  private cacheDuration = 3600000;

  ngOnInit() {
    this.loadInitialWeatherData();
  }

  private loadInitialWeatherData(): void {
    const lastCity = this.cacheService.getCache<string>('lastCity');

    if (lastCity) {
      this.searchWeatherByCity(lastCity);
    } else {
      this.isLoading = true;
      this.geolocationService
        .getUserLocation()
        .pipe(
          switchMap((position) => {
            const { latitude, longitude } = position.coords;
            return this.weatherService.getWeatherByCoords(latitude, longitude);
          }),
          catchError((error) => {
            this.errorHandler.handleGeolocationError(error); 
            return of(null);
          })
        )
        .subscribe({
          next: (data: WeatherResponse | null) => {
            if (data) {
              this.processWeatherData(data);
            }
          },
          complete: () => (this.isLoading = false),
        });
    }
  }

  searchWeather(): void {
    if (this.cityControl.invalid) return;

    const city = this.cityControl.value!;
    this.searchWeatherByCity(city);
  }

  private searchWeatherByCity(city: string): void {
    this.isLoading = true;

    const cachedWeather = this.cacheService.getCache<WeatherResponse>(
      `weather_${city}`
    );

    if (cachedWeather) {
      this.processWeatherData(cachedWeather);
      this.isLoading = false;
    } else {
      this.weatherService
        .getWeather(city)
        .pipe(
          catchError((error) => {
            this.errorHandler.handleError(error);
            return of(null);
          })
        )
        .subscribe({
          next: (data: WeatherResponse | null) => {
            if (data) {
              this.processWeatherData(data);
              this.cityControl.reset();
              this.cacheService.setCache(
                `weather_${city}`,
                data,
                this.cacheDuration
              );
            }
          },
          complete: () => (this.isLoading = false),
        });
    }
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoriteCitiesService.removeCity(this.cityName);
      this.snackBar.open(`${this.cityName} removed from favorites`, 'Close', {
        duration: 3000,
      });
    } else {
      this.favoriteCitiesService.addCity(this.cityName);
      this.snackBar.open(`${this.cityName} added to favorites`, 'Close', {
        duration: 3000,
      });
    }
    this.isFavorite = !this.isFavorite;
  }

  private processWeatherData(data: WeatherResponse): void {
    this.cityName = data.city.name;
    this.weatherData = this.getFiveDayForecast(data.list);
    this.todayWeather = data.list[0];
    this.isFavorite = this.favoriteCitiesService.isCityFavorite(this.cityName);
    this.cacheService.setCache('lastCity', this.cityName);
  }

  private getFiveDayForecast(list: WeatherData[]): WeatherData[] {
    const forecastMap = new Map<string, WeatherData>();

    list.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!forecastMap.has(date)) {
        forecastMap.set(date, item);
      }
    });

    return Array.from(forecastMap.values()).slice(1, 6);
  }

  getWeatherIcon(iconCode: string): string {
    return getWeatherIcon(iconCode);
  }
}

