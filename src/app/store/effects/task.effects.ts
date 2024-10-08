import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, catchError } from 'rxjs/operators';
import {
  getTasks,
  getTasksSuccess,
  postTask,
  postTaskSuccess,
  postTaskError,
  getTasksError,
  putTask,
  putTaskSuccess,
  putTaskError,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskError,
} from '../actions/task.actions';
import { TaskService } from '../../pages/task-page/services/task/task.service';

@Injectable()
export class TasksEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasks.type),
      exhaustMap(() =>
        this.taskService.getTasks().pipe(
          exhaustMap((tasks) => of(getTasksSuccess({ tasks }))),
          catchError((_error) => of(getTasksError({ error: 'Erro ao obter lista de tarefas.' })))
        )
      )
    )
  );

  postTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postTask.type),
      exhaustMap(({ task }) => {
        return this.taskService.postTask(task).pipe(
          exhaustMap(() => {
            return of(postTaskSuccess({ task }));
          }),
          catchError((_error) => of(postTaskError({ error: 'Erro ao adicionar tarefa.' })))
        );
      })
    )
  );

  putTask = createEffect(() =>
    this.actions$.pipe(
      ofType(putTask.type),
      exhaustMap(({ task }) => {
        return this.taskService.updateTaskTodo(task).pipe(
          exhaustMap(() => {
            return of(putTaskSuccess({ task }));
          }),
          catchError((_error) =>
            of(putTaskError({ error: 'Erro ao atualizar tarefa.' }))
          )
        );
      })
    )
  );

  deleteTask = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask.type),
      exhaustMap(({ task }) => {
        return this.taskService.deleteTaskDone(task).pipe(
          exhaustMap(() => {
            return of(deleteTaskSuccess({ task }));
          }),
          catchError((_error) =>
            of(deleteTaskError({ error: 'Erro ao deletar tarefa.' }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) { }
}
