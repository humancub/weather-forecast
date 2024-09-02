import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { ErrorHandlerService } from '..';
import { CacheService } from '../cache/cache.service';
import { APP_CONFIG } from '../../app.config';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  let cacheService: jasmine.SpyObj<CacheService>;
  let errorHandler: jasmine.SpyObj<ErrorHandlerService>;

  const mockConfig = {
    apiUrl: 'http://api.test.com',
    apiKey: 'testApiKey',
  };

  beforeEach(() => {
    const cacheServiceSpy = jasmine.createSpyObj('CacheService', ['getCache', 'setCache']);
    const errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        { provide: APP_CONFIG, useValue: mockConfig },
        { provide: CacheService, useValue: cacheServiceSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
      ],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
    cacheService = TestBed.inject(CacheService) as jasmine.SpyObj<CacheService>;
    errorHandler = TestBed.inject(ErrorHandlerService) as jasmine.SpyObj<ErrorHandlerService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cached weather data if available', () => {
    const cachedData = { city: { name: 'Test City' }, list: [] };
    cacheService.getCache.and.returnValue(cachedData);

    service.getWeather('Test City').subscribe((data) => {
      expect(data).toEqual(cachedData);
    });

    expect(cacheService.getCache).toHaveBeenCalledWith('weather_test city');
  });

  it('should fetch weather data from API if not cached', () => {
    const mockData = { city: { name: 'Test City' }, list: [] };
    cacheService.getCache.and.returnValue(null);

    service.getWeather('Test City').subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${mockConfig.apiUrl}/forecast?q=Test City&units=metric&cnt=40&appid=${mockConfig.apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(cacheService.setCache).toHaveBeenCalledWith('weather_test city', mockData);
  });

  it('should handle errors when fetching weather data', () => {
    const errorResponse = new ErrorEvent('Network error');

    service.getWeather('Test City').subscribe(
      () => fail('expected an error, not weather data'),
      (error) => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne(`${mockConfig.apiUrl}/forecast?q=Test City&units=metric&cnt=40&appid=${mockConfig.apiKey}`);
    req.error(errorResponse);

    expect(errorHandler.handleError).toHaveBeenCalled();
  });
});
