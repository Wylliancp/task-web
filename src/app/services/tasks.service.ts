import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
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

  private parseJsonBoolean(value: any) : boolean
  {
    if(value === 'true' || value === 'false')
      return JSON.parse(value);

    return false;
  }

  create(tasks: Tasks): Observable<TasksResponse> {
    const paramsCreate = {
      "title": tasks.title,
      "responsible": tasks.responsible,
      "finished": this.parseJsonBoolean(tasks.finished),
    }
    return this.http.post<TasksResponse>(this.baseUrl + '/Create', paramsCreate, );
  }

  Update(tasks: Tasks): Observable<TasksResponse> {
    const paramsUpdate = {
      "id": tasks.id,
      "title": tasks.title,
      "responsible": tasks.responsible,
      "finished": this.parseJsonBoolean(tasks.finished),
    }
    return this.http.put<TasksResponse>(this.baseUrl + '/Update', paramsUpdate);
  }

  finish(id: number): Observable<TasksResponse> {
    const paramsFinish = {
      "Id": id,
    }
    return this.http.put<TasksResponse>(this.baseUrl + '/Finish', paramsFinish);
  }

  reOpen(id: number): Observable<TasksResponse>
  {
    const paramsReOpen = {
      "Id": id,
    }
    return this.http.put<TasksResponse>(this.baseUrl + '/reOpen', paramsReOpen);
  }

  delete(id:number): Observable<TasksResponse>
  {
    return this.http.delete<TasksResponse>(this.baseUrl + '/Delete?id='+ id);
  }

}
