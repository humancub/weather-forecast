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

  it('should return user location when geolocation is available', (done) => {
    const mockPosition = {
      coords: {
        latitude: 52.52,
        longitude: 13.405,
      },
    };

    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
      (successCallback: PositionCallback) => {
        successCallback(mockPosition as GeolocationPosition);
      }
    );

    service.getUserLocation().subscribe((position) => {
      expect(position.coords.latitude).toBe(52.52);
      expect(position.coords.longitude).toBe(13.405);
      done();
    });
  });

  it('should return an error when geolocation is not available', (done) => {
    const mockError: GeolocationPositionError = {
      code: 1,
      message: 'User denied Geolocation',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    };

    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
      (
        successCallback: PositionCallback,
        errorCallback: PositionErrorCallback | null | undefined
      ) => {
        if (errorCallback) {
          errorCallback(mockError);
        }
      }
    );

    service.getUserLocation().subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error.message).toBe('User denied Geolocation');
        done();
      },
    });
  });

  it('should return an error when geolocation is not supported by the browser', (done) => {
    spyOnProperty(navigator, 'geolocation', 'get').and.returnValue(
      undefined as unknown as Geolocation
    );

    service.getUserLocation().subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error.message).toBe(
          'Geolocation is not supported by this browser.'
        );
        done();
      },
    });
  });
});
