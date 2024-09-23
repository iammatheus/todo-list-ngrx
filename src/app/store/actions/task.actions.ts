import { createAction, props } from "@ngrx/store";
import { ITask } from "../../core/interface/ITask";

export const getTasks = createAction('[TASK] GET');
export const getTasksSuccess = createAction('[TASK] GET SUCCESS', props<{ tasks: ITask[] }>());
export const getTasksError = createAction('[TASK] GET ERROR', props<{ error: string }>());

export const postTask = createAction('[TASK] POST', props<{ task: ITask }>())
export const postTaskSuccess = createAction('[TASK] POST SUCCESS', props<{ task: ITask }>());
export const postTaskError = createAction('[TASK] POST ERROR', props<{ error: string }>());

export const putTask = createAction('[TASK] PUT', props<{ task: ITask }>())
export const putTaskSuccess = createAction('[TASK] PUT SUCCESS', props<{ task: ITask }>());
export const putTaskError = createAction('[TASK] PUT ERROR', props<{ error: string }>());

export const deleteTask = createAction('[TASK] DELETE', props<{ task: ITask }>())
export const deleteTaskSuccess = createAction('[TASK] DELETE SUCCESS', props<{ task: ITask }>());
export const deleteTaskError = createAction('[TASK] DELETE ERROR', props<{ error: string }>());
