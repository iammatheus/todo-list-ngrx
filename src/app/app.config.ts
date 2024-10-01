import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withRouterConfig } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { ROOT_REDUCERS } from './store/app.state';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { EFFECTS } from './store/effects/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ReactiveFormsModule,
    ),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules), withRouterConfig({ onSameUrlNavigation: 'ignore' })),
    provideAnimations(),
    provideHttpClient(),
    provideStore(ROOT_REDUCERS),
    provideEffects(EFFECTS),
    provideStoreDevtools({
      maxAge: 25, logOnly: !isDevMode()
    }),
  ],
};
