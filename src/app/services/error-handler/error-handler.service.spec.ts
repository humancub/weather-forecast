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

  it('should show a "City not found" message for a 404 error', () => {
    const spy = spyOn(snackBar, 'open');
    const error = new HttpErrorResponse({ status: 404 });

    service.handleError(error);

    expect(spy).toHaveBeenCalledWith(
      'City not found. Please enter a valid city name.',
      'Close',
      { duration: 3000 }
    );
  });

  it('should show a "Failed to fetch weather data" message for other HTTP errors', () => {
    const spy = spyOn(snackBar, 'open');
    const error = new HttpErrorResponse({ status: 500 });

    service.handleError(error);

    expect(spy).toHaveBeenCalledWith(
      'Failed to fetch weather data. Please try again.',
      'Close',
      { duration: 3000 }
    );
  });

  it('should show an "Unexpected error occurred" message for non-HTTP errors', () => {
    const spy = spyOn(snackBar, 'open');
    const error = new Error('Some non-HTTP error');

    service.handleError(error);

    expect(spy).toHaveBeenCalledWith('An unexpected error occurred.', 'Close', {
      duration: 3000,
    });
  });
});
