import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';
import { TaskTodoComponent } from './components/task-todo/task-todo.component';
import { TaskDoingComponent } from './components/task-doing/task-doing.component';
import { TaskDoneComponent } from './components/task-done/task-done.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../core/interface/IAppState';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { MatButtonModule } from '@angular/material/button';
import { selectLoading, selectTaskListError } from '../../store/selectors/task.selectors';
import { getTasks } from '../../store/actions/task.actions';

@Component({
  selector: 'app-task-page',
  standalone: true,
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
  imports: [
    AsyncPipe,
    NgIf,
    TaskTodoComponent,
    TaskDoingComponent,
    TaskDoneComponent,
    TaskAddComponent,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule
  ],
})
export class TaskPageComponent {
  loading$: Observable<boolean> = new Observable();
  error$: Observable<string> = new Observable();

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.dispatch(getTasks())
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectTaskListError);
  }
}
