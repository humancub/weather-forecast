import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService, ErrorHandlerService, FavoriteCitiesService, GeolocationService, CacheService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;
  let errorHandler: jasmine.SpyObj<ErrorHandlerService>;
  let favoriteCitiesService: jasmine.SpyObj<FavoriteCitiesService>;
  let geolocationService: jasmine.SpyObj<GeolocationService>;
  let cacheService: jasmine.SpyObj<CacheService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeather', 'getWeatherByCoords']);
    const errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['handleError']);
    const favoriteCitiesServiceSpy = jasmine.createSpyObj('FavoriteCitiesService', ['addCity', 'removeCity', 'isCityFavorite']);
    const geolocationServiceSpy = jasmine.createSpyObj('GeolocationService', ['getUserLocation']);
    const cacheServiceSpy = jasmine.createSpyObj('CacheService', ['getCache', 'setCache']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule,  
        WeatherComponent
      ],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
        { provide: FavoriteCitiesService, useValue: favoriteCitiesServiceSpy },
        { provide: GeolocationService, useValue: geolocationServiceSpy },
        { provide: CacheService, useValue: cacheServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: ActivatedRoute, useValue: {} }  
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    errorHandler = TestBed.inject(ErrorHandlerService) as jasmine.SpyObj<ErrorHandlerService>;
    favoriteCitiesService = TestBed.inject(FavoriteCitiesService) as jasmine.SpyObj<FavoriteCitiesService>;
    geolocationService = TestBed.inject(GeolocationService) as jasmine.SpyObj<GeolocationService>;
    cacheService = TestBed.inject(CacheService) as jasmine.SpyObj<CacheService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


});
