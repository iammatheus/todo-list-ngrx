import { ActionReducerMap } from "@ngrx/store";
import { ITaskState } from "../core/interface/ITask";
import { taskReducer } from "./reducers/task.reducer";

export interface IAppState {
  tasks: Readonly<ITaskState>;
}

export const ROOT_REDUCERS: ActionReducerMap<IAppState> = {
  tasks: taskReducer,
}
