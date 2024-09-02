import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [ErrorHandlerService],
    });
    service = TestBed.inject(ErrorHandlerService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show "City not found" message for 404 error', () => {
    const spy = spyOn(snackBar, 'open');
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
    });

    service.handleError(errorResponse);

    expect(spy).toHaveBeenCalledWith(
      'City not found. Please enter a valid city name.',
      'Close',
      { duration: 3000 }
    );
  });

  it('should show "Failed to fetch weather data" message for non-404 HttpErrorResponse', () => {
    const spy = spyOn(snackBar, 'open');
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
    });

    service.handleError(errorResponse);

    expect(spy).toHaveBeenCalledWith(
      'Failed to fetch weather data. Please try again.',
      'Close',
      { duration: 3000 }
    );
  });

  it('should show "An unexpected error occurred" message for general errors', () => {
    const spy = spyOn(snackBar, 'open');
    const error = new Error('Unexpected error');

    service.handleError(error);

    expect(spy).toHaveBeenCalledWith('An unexpected error occurred.', 'Close', {
      duration: 3000,
    });
  });
});
