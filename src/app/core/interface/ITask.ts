export interface ITask {
  id: string;
  name: string;
  status: string;
}

export interface ITaskState {
  tasks: ITask[];
  loading: boolean;
  error: string;
}
