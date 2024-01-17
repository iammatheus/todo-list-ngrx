import { createAction, props } from "@ngrx/store";
import { ITask } from "../../../core/interface/ITask";

export const loadTasks = createAction('[TASK] Tasks loading');
export const loadedTasksSuccess = createAction('[TASK] Tasks loaded success', props<{ tasks: ITask[] }>());
export const loadedTasksError = createAction('[TASK] Tasks loaded error');

