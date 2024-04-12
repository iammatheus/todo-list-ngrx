import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { selectListTasks, selectLoading } from '../../../../store/selectors/task/task.selectors';
import { IAppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { ITask } from '../../../../core/interface/ITask';
import { Observable } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskService } from '../../services/task.service';
import { deleteTask } from '../../../../store/actions/task/task.actions';

@Component({
  selector: 'app-task-done',
  templateUrl: './task-done.component.html',
  styleUrls: ['./task-done.component.css'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
})
export class TaskDoneComponent implements OnInit {
  tasks$: Observable<ITask[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.tasks$ = this.store.select(selectListTasks, { statusTask: 'done' });
    this.loading$ = this.store.select(selectLoading);
  }

  deleteTask(task: ITask) {
    this.store.dispatch(deleteTask({ task }));
  }
}
