import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', loadChildren: () => import('./pages/task-page/task-page.routes').then(m => m.TASK_ROUTES) }
];
