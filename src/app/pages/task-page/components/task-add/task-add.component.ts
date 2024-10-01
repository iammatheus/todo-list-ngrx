import { ITask } from './../../../../core/interface/ITask';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { postTask } from '../../../../store/actions/task.actions';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  standalone: true,
})
export class TaskAddComponent implements OnInit {
  form!: FormGroup;
  task!: ITask;

  constructor(public store: Store) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      status: new FormControl('todo', [Validators.required]),
    })
  }

  postTask() {
    let maxId = Math.random().toFixed(5);
    this.task = this.form.value;
    this.task.id = maxId;
    this.store.dispatch(postTask({ task: this.task }));
    this.form.get('name')?.setValue('');
  }
}
