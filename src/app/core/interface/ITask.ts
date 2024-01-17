export interface ITask {
  id: number;
  name: string;
  status: string;
}

export interface ITaskState {
  tasks: ITask[];
  isLoading: boolean;
}
