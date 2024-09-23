import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TaskAddComponent } from './task-add.component';
import { FormBuilder } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ITask } from './../../../../core/interface/ITask';
import { addTask } from '../../../../store/actions/task/task.actions';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('TaskAddComponent', () => {
  let component: TaskAddComponent;
  let fixture: ComponentFixture<TaskAddComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        provideAnimations(),
        provideMockStore({ initialState: {} }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => { });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('id')).toBeDefined();
    expect(component.form.get('name')).toBeDefined();
    expect(component.form.get('status')).toBeDefined();
  });

  it('should add a task', () => {
    const task: ITask = {
      id: '',
      name: 'Task Name',
      status: 'todo',
    };

    spyOn(Math, 'random').and.returnValue(0.12345);

    component.form.setValue(task);
    component.addTask();

    expect(store.dispatch).toHaveBeenCalledWith(addTask({ task: { id: '0.12345', name: 'Task Name', status: 'todo' } }));
  });
});
