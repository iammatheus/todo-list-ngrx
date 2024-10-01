import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', loadChildren: () => import('./pages/task-page/task-page.routes').then(m => m.TASK_ROUTES) },
  { path: 'comparison', loadChildren: () => import('./pages/comparison/comparison-page.routes').then(m => m.COMPARISON_ROUTES) },
  { path: 'comparison-ngrx', loadChildren: () => import('./pages/comparison-ngrx/comparison-ngrx-page.routes').then(m => m.COMPARISON_NGRX_ROUTES) },
];
