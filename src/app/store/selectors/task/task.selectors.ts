import { createSelector } from '@ngrx/store';
import { ITaskState } from '../../../core/interface/ITask';
import { IAppState } from '../../../core/interface/IAppState';

export const selectTasks = (state: IAppState) => state.tasks;

export const selectListTasks = createSelector(
  selectTasks,
  (state: ITaskState, props?: { statusTask: string }) =>
    state.tasks.filter((task) => task.status === props?.statusTask)
);

export const selectLoading = createSelector(
  selectTasks,
  (state: ITaskState) => state.isLoading
);
