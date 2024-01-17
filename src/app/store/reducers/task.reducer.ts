import { createReducer, on } from "@ngrx/store";
import { ITaskState } from '../../core/interface/ITask';
import { loadTasks, loadedTasksError, loadedTasksSuccess } from "../actions/task/task.actions";

const initialState: ITaskState = {
  tasks: [],
  isLoading: false
}

export const taskReducer = createReducer(
  initialState,
  on(loadTasks, (state) => {
    return { ...state, isLoading: true };
  }),
  on(loadedTasksSuccess, (state, { tasks }) => {
    return { ...state, tasks, isLoading: false };
  }),
  on(loadedTasksError, (state) => {
    return { ...state, isLoading: false };
  })
)
