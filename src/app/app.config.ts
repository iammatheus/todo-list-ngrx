import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { TasksEffects } from './store/effects/task/task.effects';
import { ROOT_REDUCERS } from './store/app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideHttpClient(),
    provideStore(ROOT_REDUCERS),
    provideStoreDevtools({
      maxAge: 25, logOnly: !isDevMode()
    }),
    provideEffects(TasksEffects)
  ],
};
