import {
  ApplicationConfig,
  importProvidersFrom,
  InjectionToken,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';

export interface AppConfig {
  apiKey: string;
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG_VALUE: AppConfig = {
  apiKey: '7d37c5a4e33fc0e8df130f1033c9da16',
  apiUrl: 'https://api.openweathermap.org/data/2.5',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(SharedModule),
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
  ],
};
