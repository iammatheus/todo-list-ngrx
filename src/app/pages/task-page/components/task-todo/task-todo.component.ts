import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { IAppState } from '../../../../core/interface/IAppState';
import { selectListTasks } from '../../../../store/selectors/task/task.selectors';
import { ITask } from '../../../../core/interface/ITask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { updateTask } from '../../../../store/actions/task/task.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class TaskTodoComponent implements OnInit {

  constructor(private store: Store<IAppState>) { }
  tasks$: Observable<ITask[]> = new Observable();

  ngOnInit() {
    this.tasks$ = this.store.select(selectListTasks, { statusTask: 'todo' });
  }

  startTask(taskSelected: ITask) {
    let task: ITask = {
      id: taskSelected.id,
      name: taskSelected.name,
      status: 'doing'
    }
    this.store.dispatch(updateTask({ task }));
  }
}
