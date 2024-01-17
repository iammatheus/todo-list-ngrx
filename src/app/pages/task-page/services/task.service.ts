import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { ITask } from '../../../core/interface/ITask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private BASE_URL = `http://localhost:3000`;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.BASE_URL}/task_list`).pipe(delay(2000));
  }
}
