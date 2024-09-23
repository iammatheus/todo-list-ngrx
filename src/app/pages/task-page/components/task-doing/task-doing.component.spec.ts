/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskDoingComponent } from './task-doing.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormBuilder } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ITask } from '../../../../core/interface/ITask';
import { updateTask } from '../../../../store/actions/task/task.actions';
import { of } from 'rxjs';
import { selectListTasks } from '../../../../store/selectors/task/task.selectors';

describe('TaskDoingComponent', () => {
  let component: TaskDoingComponent;
  let fixture: ComponentFixture<TaskDoingComponent>;
  let store: MockStore<any>;
  const mockTask: ITask = {
    id: '0.12345',
    name: 'Task Name',
    status: 'todo',
  }
  const mockTasks: ITask[] = [
    { id: "1", name: 'Task 1', status: 'doing' },
    { id: "2", name: 'Task 2', status: 'doing' }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        provideAnimations(),
        provideMockStore({ initialState: {} }),
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => { });
    spyOn(store, 'select').and.returnValue(of(mockTasks));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update to done', () => {
    component.doneTask(mockTask);
    expect(store.dispatch).toHaveBeenCalledWith(updateTask({ task: { id: '0.12345', name: 'Task Name', status: 'done' } }));
  });

  it('should update to todo', () => {
    component.backTask(mockTask);
    expect(store.dispatch).toHaveBeenCalledWith(updateTask({ task: { id: '0.12345', name: 'Task Name', status: 'todo' } }));
  });

  it('should select tasks with status "doing" from store', () => {
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(selectListTasks, { statusTask: 'doing' });
    component.tasks$.subscribe(res => {
      expect(res).toEqual(mockTasks);
    })
  });
});
