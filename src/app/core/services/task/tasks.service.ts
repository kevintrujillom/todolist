import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../../environments/environment';
import { Task } from './../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor( private http: HttpClient ) { }

  getAll(): any {
    return this.http.get<Task[]>(`${environment.url_api}/todos`)
  }

  create(task: Task): any {
    return this.http.post(`${environment.url_api}/todos`, task)
  }

  update(task: Task): any {
    return this.http.put(`${environment.url_api}/todos/${task.id}`, task)
  }

  delete(id: number): any {
    return this.http.delete(`${environment.url_api}/todos/${id}`)
  }
  
}
