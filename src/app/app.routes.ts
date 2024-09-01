import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather';


export const routes: Routes = [
    { path: '', redirectTo: '/weather-forecast', pathMatch: 'full' },
    { path: 'weather-forecast', component: WeatherComponent },
    { path: 'favorites', loadComponent: () => import('./components/favorite-cities/favorite-cities.component').then(m => m.FavoriteCitiesComponent) },
  ];
  
