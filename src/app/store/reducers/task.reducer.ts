import { createReducer, on } from "@ngrx/store";
import { ITaskState } from '../../core/interface/ITask';
import { addTask, addTaskFailure, addTaskSuccess, deleteTask, deleteTaskFailure, deleteTaskSuccess, loadTasks, loadedTasksError, loadedTasksSuccess, updateTask, updateTaskFailure, updateTaskSuccess } from "../actions/task/task.actions";

const initialState: ITaskState = {
  tasks: [],
  isLoading: false,
  error: false,
}

export const taskReducer = createReducer(
  initialState,
  on(loadTasks, (state) => {
    return { ...state, isLoading: true };
  }),
  on(loadedTasksSuccess, (state, { tasks }) => {
    return { ...state, tasks, isLoading: false };
  }),
  on(loadedTasksError, (state, { error }): ITaskState => {
    return { ...state, tasks: [], error: true, isLoading: false };
  }),

  on(addTask, (state,) => {
    return { ...state, isLoading: true }
  }),
  on(addTaskSuccess, (state, { task }): ITaskState => {
    return { ...state, tasks: [...state.tasks, task], isLoading: false }
  }),
  on(addTaskFailure, (state, { error }) => {
    return { ...state, tasks: [], error: true, isLoading: false }
  }),

  on(updateTask, (state, { task }) => {
    return { ...state, task, isLoading: true, error: false }
  }),
  on(updateTaskSuccess, (state, { task }): ITaskState => {
    const _newdata = state.tasks.map(item => {
      return item.id == task.id ? task : item
    })

    return {
      ...state,
      error: false,
      tasks: _newdata,
      isLoading: false,
    }
  }),
  on(updateTaskFailure, (state, { error }) => {
    return { ...state, tasks: [], error: true, isLoading: false }
  }),

  on(deleteTask, (state, { task }) => {
    return { ...state, task, isLoading: true, error: false }
  }),
  on(deleteTaskSuccess, (state, { task }): ITaskState => {
    const _newdata = state.tasks.filter(item => {
      return item.id !== task.id
    })

    return {
      ...state,
      error: false,
      tasks: _newdata,
      isLoading: false,
    }
  }),
  on(deleteTaskFailure, (state, { error }) => {
    return { ...state, tasks: [], error: true, isLoading: false }
  }),

)
