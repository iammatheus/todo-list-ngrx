import { ITask } from './../../../../core/interface/ITask';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from '../../../../store/actions/task/task.actions';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';

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
    NgIf,
  ],
  standalone: true,
})
export class TaskAddComponent implements OnInit {
  form!: FormGroup;
  task = {} as ITask;

  constructor(private fb: FormBuilder, public store: Store) { }

  ngOnInit() {
    this.validaForm();
  }

  validaForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  addTask() {
    let maxId = Math.random().toFixed(5);
    this.task = this.form.value;
    this.task.id = maxId;
    this.store.dispatch(addTask({ task: this.task }));
  }
}
