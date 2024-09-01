import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: HttpErrorResponse | Error): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 404) {
        this.showSnackBar('City not found. Please enter a valid city name.');
      } else {
        this.showSnackBar('Failed to fetch weather data. Please try again.');
      }
    } else {
      this.showSnackBar('An unexpected error occurred.');
    }
  }

  handleGeolocationError(error: any): void {
    if (error.code === 1) {
      this.snackBar.open(
        'Location access denied. Please enter a city manually.',
        'Close',
        {
          duration: 5000,
        }
      );
    } else {
      this.handleError(new Error('Unable to retrieve your location.'));
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
