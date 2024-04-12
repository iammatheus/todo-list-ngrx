export interface ITask {
  id: string;
  name: string;
  status: string;
}

export interface ITaskState {
  tasks: ITask[];
  isLoading: boolean;
  error: boolean;
}
