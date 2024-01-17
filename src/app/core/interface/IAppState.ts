import { ActionReducerMap } from "@ngrx/store";
import { ITaskState } from "./ITask";
import { taskReducer } from "../../store/reducers/task.reducer";

export interface IAppState {
  tasks: ITaskState;
}

export const ROOT_REDUCERS: ActionReducerMap<IAppState> = {
  tasks: taskReducer
}
