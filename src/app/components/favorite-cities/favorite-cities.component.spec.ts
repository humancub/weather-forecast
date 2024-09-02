import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteCitiesComponent } from './favorite-cities.component';
import { FavoriteCitiesService, WeatherService } from '../../services';
import { of } from 'rxjs';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('FavoriteCitiesComponent', () => {
  let component: FavoriteCitiesComponent;
  let fixture: ComponentFixture<FavoriteCitiesComponent>;
  let favoriteCitiesService: jasmine.SpyObj<FavoriteCitiesService>;
  let weatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const favoriteCitiesServiceSpy = jasmine.createSpyObj('FavoriteCitiesService', ['getFavoriteCities', 'removeCity']);
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeather']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule.forRoot([]), // Подключаем пустой маршрутизатор
        SharedModule,
        FavoriteCitiesComponent // Используем как standalone компонент
      ],
      providers: [
        { provide: FavoriteCitiesService, useValue: favoriteCitiesServiceSpy },
        { provide: WeatherService, useValue: weatherServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteCitiesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
