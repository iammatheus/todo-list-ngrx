import { createSelector } from '@ngrx/store';
import { ITask, ITaskState } from '../../core/interface/ITask';
import { IAppState } from '../app.state';

export const selectTasks = (state: IAppState) => state.tasks;

export const selectLoading = createSelector(
  selectTasks,
  (state: ITaskState) => state.loading
);

export const selectTodoTaskList = createSelector(
  selectTasks,
  (state: ITaskState) =>
    state.tasks.filter((task: ITask) => task.status === 'todo')
);

export const selectDoingTaskList = createSelector(
  selectTasks,
  (state: ITaskState) =>
    state.tasks.filter((task: ITask) => task.status === 'doing')
);


export const selectDoneTaskList = createSelector(
  selectTasks,
  (state: ITaskState) =>
    state.tasks.filter((task: ITask) => task.status === 'done')
);

export const selectTaskListError = createSelector(
  selectTasks,
  (state: ITaskState) =>
    state.error
);


