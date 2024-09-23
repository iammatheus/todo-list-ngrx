import { provideAnimations } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskDoneComponent } from './task-done.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '../../../../store/app.state';
import { ITask } from '../../../../core/interface/ITask';
import { of } from 'rxjs';
import { deleteTask } from '../../../../store/actions/task.actions';
import { selectDoneTaskList } from '../../../../store/selectors/task.selectors';

describe('TaskDoneComponent', () => {
  let component: TaskDoneComponent;
  let fixture: ComponentFixture<TaskDoneComponent>;
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
        provideMockStore({ initialState: {} }),
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => { })
    spyOn(store, 'select').and.returnValue(of(mockTasks));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should excluded task', () => {
    component.deleteTask(mockTask);
    expect(store.dispatch).toHaveBeenCalledWith(deleteTask({ task: mockTask }))
  });

  it('should select tasks with status "done" from store', () => {
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(selectDoneTaskList, { statusTask: 'done' });
    component.tasks$.subscribe(res => {
      expect(res).toEqual(mockTasks);
    })
  });
});
