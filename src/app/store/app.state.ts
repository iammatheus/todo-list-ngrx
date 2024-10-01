import { ActionReducerMap } from "@ngrx/store";
import { ITaskState } from "../core/interface/ITask";
import { taskReducer } from "./reducers/task.reducer";
import { IComparisonState } from "../core/interface/IComparison";
import { countryReducer, userReducer } from "./reducers/comparison.reducer";

export interface IAppState {
  tasks: Readonly<ITaskState>;
  users: Readonly<IComparisonState>;
  countries: Readonly<IComparisonState>;
}

export const ROOT_REDUCERS: ActionReducerMap<IAppState> = {
  tasks: taskReducer,
  users: userReducer,
  countries: countryReducer
}
