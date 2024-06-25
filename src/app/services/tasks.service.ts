import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks';
import { Observable } from 'rxjs';
import { TasksResponse } from '../models/response/tasksResponse';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = 'https://localhost:5001/Task';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.baseUrl + '/GetAll');
  }

  getById(id: number): Observable<Tasks> {
    return this.http.get<Tasks>(this.baseUrl + '/GetById?id=' + id);
  }

  create(tasks: Tasks): Observable<TasksResponse> {
    const paramsCreate = {
      "title": tasks.title,
      "responsible": tasks.responsible,
      "finished": tasks.finished = true ? true : false,
    }
    return this.http.post<TasksResponse>(this.baseUrl + '/Create', paramsCreate);
  }

  Update(tasks: Tasks): Observable<TasksResponse> {
    console.log(tasks.finished);
    const paramsUpdate = {
      "id": tasks.id,
      "title": tasks.title,
      "responsible": tasks.responsible,
      "finished": tasks.finished = true ? true : false,
    }
    return this.http.put<TasksResponse>(this.baseUrl + '/Update', paramsUpdate);
  }

  finish(id: number): Observable<TasksResponse> {
    const paramsCreate = {
      "Id": id,
    }
    return this.http.put<TasksResponse>(this.baseUrl + '/Finish', JSON.stringify(id));
  }

  reOpen(id: number): Observable<TasksResponse>
  {
    return this.http.put<TasksResponse>(this.baseUrl + '/reOpen', JSON.stringify(id));
  }

  delete(id:number): Observable<TasksResponse>
  {
    return this.http.delete<TasksResponse>(this.baseUrl + '/Delete?id='+ id);
  }

}
