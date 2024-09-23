import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPageComponent } from './task-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '../../store/app.state';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadTasks } from '../../store/actions/task/task.actions';
import { selectLoading } from '../../store/selectors/task/task.selectors';
import { of } from 'rxjs';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;
  let store: MockStore<IAppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        provideMockStore()
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => { })
    spyOn(store, 'select').and.returnValue(of(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks', () => {
    component.loadTasks();
    expect(store.dispatch).toHaveBeenCalledWith(loadTasks())
  });

  it('should select loading state from store', () => {
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(selectLoading);
    expect(component.loading$).toBeTruthy();
  });

});
