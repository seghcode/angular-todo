import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { TASKS } from 'src/app/mock-tasks';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3232/api';

  constructor(private http: HttpClient) {}

  // get task
  getTasks(): Observable<Task[]> {
    // const tasks = of(TASKS)
    return this.http.get<Task[]>(this.apiUrl + '/todos/list');
  }

  // delete task
  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.apiUrl + `/todos/delete/${task.uid} `);
  }

  // update completed
  updateTaskCompleted(task: Task): Observable<Task> {
    return this.http.get<Task>(
      this.apiUrl + `/todos/toggle-completion-status/${task.uid} `
    );
  }

  // add new task
  addTodo(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl + '/todos/create', task);
  }

  // update the a single task
  updateSingleTask(uid:string,title:string,description:string): Observable<Task> {
    return this.http.patch<Task>(
      this.apiUrl + `/todos/update/${uid}`,
     {
      title:title,
      description:description
     }
    );
  }
}
