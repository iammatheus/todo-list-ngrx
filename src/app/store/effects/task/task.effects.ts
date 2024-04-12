import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { loadTasks, loadedTasksSuccess, addTask, addTaskSuccess, addTaskFailure, loadedTasksError, updateTask, updateTaskSuccess, updateTaskFailure, deleteTask, deleteTaskSuccess } from '../../actions/task/task.actions';
import { TaskService } from '../../../pages/task-page/services/task.service';

@Injectable()
export class TasksEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadTasks.type),
    exhaustMap(() =>
      this.taskService.getTasks()
        .pipe(
          map(tasks => ({ type: loadedTasksSuccess.type, tasks })),
          catchError((_error) => of(loadedTasksError({ error: _error })))
        )
    )
  ));

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask.type),
      exhaustMap(({ task }) => {
        return this.taskService.postTask(task).pipe(
          exhaustMap(() => {
            return of(addTaskSuccess({ task }))
          }),
          catchError((_error) => of(addTaskFailure({ error: _error }))),
        )
      })
    )
  )

  updateTask = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask.type),
      exhaustMap(({ task }) => {
        return this.taskService.updateTaskTodo(task).pipe(
          exhaustMap(() => {
            return of(updateTaskSuccess({ task }),
            )
          }),
          catchError((_error) => of(updateTaskFailure({ error: 'Erro ao alterar status da tarefa.' })))
        )
      })
    )
  )

  deleteTask = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask.type),
      exhaustMap(({ task }) => {
        return this.taskService.deleteTaskDone(task).pipe(
          exhaustMap(() => {
            return of(deleteTaskSuccess({ task }),
            )
          }),
          catchError((_error) => of(updateTaskFailure({ error: 'Erro ao deletar tarefa.' })))
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) { }
}
