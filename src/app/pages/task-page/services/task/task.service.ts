import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ITask } from '../../../../core/interface/ITask';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private BASE_URL = `http://localhost:3000`;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.BASE_URL}/task_list`).pipe(take(1));
  }
  postTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${this.BASE_URL}/task_list`, task).pipe(take(1));
  }
  updateTaskTodo(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.BASE_URL}/task_list/${task.id}`, task).pipe(take(1));
  }
  deleteTaskDone(task: ITask): Observable<ITask> {
    return this.http.delete<ITask>(`${this.BASE_URL}/task_list/${task.id}`).pipe(take(1));
  }
}
