import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppConfig, APP_CONFIG } from '../app.config';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

private apiUrl: string;
private apiKey: string;

constructor(
  private http: HttpClient,
  @Inject(APP_CONFIG) private config: AppConfig,
  private errorHandler: ErrorHandlerService
  ) {
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
  }

getWeather(city: string): Observable<any> {
  const url = `${this.apiUrl}/forecast?q=${city}&units=metric&cnt=40&appid=${this.apiKey}`;
  return this.http.get<any>(url).pipe(
    catchError(error => {
      this.errorHandler.handleError(error);
      return throwError(() => error);
    })
  );
}

}


