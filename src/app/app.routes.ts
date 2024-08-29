import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [
  { path: '', redirectTo: '/weather-forecast', pathMatch: 'full' },
  { path: 'weather-forecast', component: WeatherComponent },
];
