import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  getUserLocation(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => observer.next(position),
          (error) => observer.error(error),
          { timeout: 10000 }
        );
      } else {
        observer.error(
          new Error('Geolocation is not supported by this browser.')
        );
      }
    });
  }
}
