import { createReducer, on } from '@ngrx/store';
import { ITaskState } from '../../core/interface/ITask';
import {
  postTask,
  postTaskError,
  postTaskSuccess,
  deleteTask,
  deleteTaskError,
  deleteTaskSuccess,
  getTasks,
  getTasksError,
  getTasksSuccess,
  putTask,
  putTaskError,
  putTaskSuccess,
} from '../actions/task.actions';

const initialState: ITaskState = {
  tasks: [],
  loading: false,
  error: '',
};

export const taskReducer = createReducer(
  initialState,

  //get
  on(getTasks, (state) => {
    return { ...state, loading: true };
  }),
  on(getTasksSuccess, (state, { tasks }) => {
    return { ...state, tasks, loading: false };
  }),
  on(getTasksError, (state, { error }): ITaskState => {
    return { ...state, tasks: [], error, loading: false };
  }),


  //post
  on(postTask, (state) => {
    return { ...state, loading: true };
  }),
  on(postTaskSuccess, (state, { task }): ITaskState => {
    return { ...state, tasks: [...state.tasks, task], loading: false };
  }),
  on(postTaskError, (state, { error }) => {
    return { ...state, tasks: [], error, loading: false };
  }),


  //put
  on(putTask, (state, { task }) => {
    return { ...state, task, loading: true, error: '' };
  }),
  on(putTaskSuccess, (state, { task }): ITaskState => {
    const _newdata = state.tasks.map((item) => {
      return item.id == task.id ? task : item;
    });

    return {
      ...state,
      error: '',
      tasks: _newdata,
      loading: false,
    };
  }),
  on(putTaskError, (state, { error }) => {
    return { ...state, tasks: [], error, loading: false };
  }),


  //delete
  on(deleteTask, (state, { task }) => {
    return { ...state, task, loading: true, error: '' };
  }),
  on(deleteTaskSuccess, (state, { task }): ITaskState => {
    const _newdata = state.tasks.filter((item) => {
      return item.id !== task.id;
    });

    return {
      ...state,
      error: '',
      tasks: _newdata,
      loading: false,
    };
  }),
  on(deleteTaskError, (state, { error }) => {
    return { ...state, tasks: [], error, loading: false };
  })
);
