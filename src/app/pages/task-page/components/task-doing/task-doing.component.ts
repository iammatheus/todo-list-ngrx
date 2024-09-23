import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITask } from '../../../../core/interface/ITask';
import { IAppState } from '../../../../store/app.state';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { selectDoingTaskList } from '../../../../store/selectors/task.selectors';
import { putTask } from '../../../../store/actions/task.actions';

@Component({
  selector: 'app-task-doing',
  templateUrl: './task-doing.component.html',
  styleUrls: ['./task-doing.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    MatTooltipModule
  ]
})
export class TaskDoingComponent implements OnInit {

  tasks$: Observable<ITask[]> = new Observable();

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.tasks$ = this.store.select(selectDoingTaskList);
  }

  backTask(taskSelected: ITask) {
    let task: ITask = {
      id: taskSelected.id,
      name: taskSelected.name,
      status: 'todo'
    }
    this.store.dispatch(putTask({ task }));
  }

  doneTask(taskSelected: ITask) {
    let task: ITask = {
      id: taskSelected.id,
      name: taskSelected.name,
      status: 'done'
    }
    this.store.dispatch(putTask({ task }));
  }

}
