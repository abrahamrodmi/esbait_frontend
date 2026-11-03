import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // <-- Soluciona el error NG0908 en Angular 20+
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ]
};



