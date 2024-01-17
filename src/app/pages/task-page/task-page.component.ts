import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';
import { TaskTodoComponent } from './components/task-todo/task-todo.component';
import { TaskDoingComponent } from './components/task-doing/task-doing.component';
import { TaskDoneComponent } from './components/task-done/task-done.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../core/interface/IAppState';
import { loadTasks } from '../../store/actions/task/task.actions';
import { Observable } from 'rxjs';
import { selectLoading } from '../../store/selectors/task/task.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [
    MatCardModule,
    TaskTodoComponent,
    TaskDoingComponent,
    TaskDoneComponent,
    MatProgressSpinnerModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent {
  loading$: Observable<boolean> = new Observable()

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.dispatch(loadTasks())
    this.loading$ = this.store.select(selectLoading);
  }
}
