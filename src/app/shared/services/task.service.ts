import { inject, Injectable } from '@angular/core';
import Task from '../models/task.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environement } from '../../../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseURL : string  = `${environement.apiUrl}/to-do`
  http=inject(HttpClient)
  // ***** signales ***** 
  /* LCRUD */
  getList(limit : string , page : string , search : string):Observable<Task[]>{
    let params = new HttpParams();
    params = params.append('limit', limit);
    params = params.append('page', page);
    if(search){
      params = params.append('search', search)
    };
    return this.http.get<Task[]>(this.baseURL,{params})
  }

  addNewOne(task: Task):Observable<null>{
    return this.http.post<null>(this.baseURL,{task})
  }

  readOne(id:string):Observable<Task>{
    return this.http.get<Task>(`${this.baseURL}/${id}`)
  }

  editOne(task: Task):Observable<Task>{
    return this.http.put<Task>(`${this.baseURL}/${task._id}`,{task})
  }

  deleteOne(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/${id}`)
  }

 
  

  complited(id:string):Observable<any>{
    return this.http.put<any>(`${this.baseURL}/${id}/complited`,{})
  }
}
