import { TestBed } from '@angular/core/testing';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an error when geolocation is not available', (done) => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    service.getUserLocation().subscribe({
      error: (error) => {
        expect(error.message).toBe(
          'Geolocation is not supported by this browser.'
        );
        done();
      },
    });
  });
});
