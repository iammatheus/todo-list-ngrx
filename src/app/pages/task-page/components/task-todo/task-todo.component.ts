import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { IAppState } from '../../../../core/interface/IAppState';
import { selectTodoTaskList } from '../../../../store/selectors/task.selectors';
import { ITask } from '../../../../core/interface/ITask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { putTask } from '../../../../store/actions/task.actions';

@Component({
  selector: 'app-task-todo',
  templateUrl: './task-todo.component.html',
  styleUrls: ['./task-todo.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    JsonPipe,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class TaskTodoComponent implements OnInit {

  constructor(private store: Store<IAppState>) { }
  tasksTodo$: Observable<ITask[]> = new Observable();

  ngOnInit() {
    this.tasksTodo$ = this.store.select(selectTodoTaskList);
  }

  startTask(taskSelected: ITask) {
    let task: ITask = {
      id: taskSelected.id,
      name: taskSelected.name,
      status: 'doing'
    }
    this.store.dispatch(putTask({ task }));
  }
}
