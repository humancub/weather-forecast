import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from '../../app.config';
import { ErrorHandlerService } from '..';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl: string;
  private apiKey: string;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private errorHandler: ErrorHandlerService,
    private cacheService: CacheService
  ) {
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
  }

  getWeather(city: string): Observable<any> {
    const cacheKey = `weather_${city.toLowerCase()}`;
    const cachedData = this.cacheService.getCache(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    const url = `${this.apiUrl}/forecast?q=${city}&units=metric&cnt=40&appid=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((data) => {
        this.cacheService.setCache(cacheKey, data);
        return data;
      }),
      catchError((error) => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
  }
}
