import { Routes } from '@angular/router';
import { FavoriteCitiesComponent } from './components/favorite-cities';
import { WeatherComponent } from './components/weather';

export const routes: Routes = [
  { path: '', redirectTo: '/weather-forecast', pathMatch: 'full' },
  { path: 'weather-forecast', component: WeatherComponent },
  { path: 'favorites', component: FavoriteCitiesComponent }
];
