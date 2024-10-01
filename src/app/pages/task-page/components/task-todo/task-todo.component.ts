import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { selectTodoTaskList } from '../../../../store/selectors/task.selectors';
import { ITask } from '../../../../core/interface/ITask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { putTask } from '../../../../store/actions/task.actions';
import { IAppState } from '../../../../store/app.state';

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
  tasksTodo$: Observable<any> = new Observable();

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
