/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskTodoComponent } from './task-todo.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '../../../../store/app.state';
import { ITask } from '../../../../core/interface/ITask';
import { putTask } from '../../../../store/actions/task.actions';
import { of } from 'rxjs';
import { selectTodoTaskList } from '../../../../store/selectors/task.selectors';

describe('TaskTodoComponent', () => {
  let component: TaskTodoComponent;
  let fixture: ComponentFixture<TaskTodoComponent>;
  let store: MockStore<IAppState>;
  const mockTask: ITask = {
    id: '0.12345',
    name: 'Task Name',
    status: 'todo',
  }
  const mockTasks: ITask[] = [
    { id: "1", name: 'Task 1', status: 'done' },
    { id: "2", name: 'Task 2', status: 'done' }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        provideMockStore({ initialState: {} })
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
    spyOn(store, 'select').and.returnValue(of(mockTasks));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => { });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update task to doing', () => {
    component.startTask(mockTask);
    mockTask.status = 'doing'
    expect(store.dispatch).toHaveBeenCalledWith(putTask({ task: mockTask }))
  });

  it('should select tasks with status "todo" from store', () => {
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(selectTodoTaskList, { statusTask: 'todo' });
    component.tasksTodo$.subscribe(res => {
      expect(res).toEqual(mockTasks);
    })
  });
});
