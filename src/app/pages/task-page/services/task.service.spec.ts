import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { ITask } from '../../../core/interface/ITask';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks from API', () => {
    const mockTasks: ITask[] = [
      { id: '1', name: 'Task 1', status: 'todo' },
      { id: '2', name: 'Task 2', status: 'todo' }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:3000/task_list');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should post a task to API', () => {
    const newTask: ITask = { id: '3', name: 'New Task', status: 'todo' };

    service.postTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/task_list');
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should update a task on API', () => {
    const updatedTask: ITask = { id: '1', name: 'Updated Task', status: 'doing' };

    service.updateTaskTodo(updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`http://localhost:3000/task_list/${updatedTask.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task from API', () => {
    const taskToDelete: ITask = { id: '2', name: 'Task to delete', status: 'done' };

    service.deleteTaskDone(taskToDelete).subscribe(task => {
      expect(task).toEqual(taskToDelete);
    });

    const req = httpMock.expectOne(`http://localhost:3000/task_list/${taskToDelete.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(taskToDelete);
  });
});
