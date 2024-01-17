import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { IAppState } from '../../../../core/interface/IAppState';
import { selectListTasks } from '../../../../store/selectors/task/task.selectors';
import { ITask } from '../../../../core/interface/ITask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-todo',
  templateUrl: './task-todo.component.html',
  styleUrls: ['./task-todo.component.css'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    JsonPipe,
    MatProgressSpinnerModule,
  ]
})
export class TaskTodoComponent implements OnInit {

  constructor(private store: Store<IAppState>) { }
  tasks$: Observable<ITask[]> = new Observable();

  ngOnInit() {
    this.tasks$ = this.store.select(selectListTasks);
  }
}
