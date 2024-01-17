import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { loadTasks, loadedTasksSuccess } from '../../actions/task/task.actions';
import { TaskService } from '../../../pages/task-page/services/task.service';

@Injectable()
export class TasksEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadTasks.type),
    exhaustMap(() =>
      this.taskService.getTasks()
        .pipe(
          map(tasks => ({ type: loadedTasksSuccess.type, tasks })),
          catchError(() => EMPTY)
        )
    )
  ));

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) { }
}
