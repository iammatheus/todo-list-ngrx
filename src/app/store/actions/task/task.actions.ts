import { createAction, props } from "@ngrx/store";
import { ITask } from "../../../core/interface/ITask";

export const loadTasks = createAction('[TASK] Tasks loading');
export const loadedTasksSuccess = createAction('[TASK] Tasks loaded success', props<{ tasks: ITask[] }>());
export const loadedTasksError = createAction('[TASK] Tasks loaded error', props<{ error: string }>());

export const addTask = createAction('[TASK] Add task', props<{ task: ITask }>())
export const addTaskSuccess = createAction('[TASK] Add task success', props<{ task: ITask }>());
export const addTaskFailure = createAction('[TASK] Add task failure', props<{ error: string }>());

export const updateTask = createAction('[TASK] Update task', props<{ task: ITask }>())
export const updateTaskSuccess = createAction('[TASK] Update task success', props<{ task: ITask }>());
export const updateTaskFailure = createAction('[TASK] Update task failure', props<{ error: string }>());

export const deleteTask = createAction('[TASK] Delete task', props<{ task: ITask }>())
export const deleteTaskSuccess = createAction('[TASK] Delete task success', props<{ task: ITask }>());
export const deleteTaskFailure = createAction('[TASK] Delete task failure', props<{ error: string }>());
