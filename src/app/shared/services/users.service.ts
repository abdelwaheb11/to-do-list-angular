import { inject, Injectable } from '@angular/core';
import { environnement } from '../../../environnements/environnment';
import { Observable } from 'rxjs';
import User, { UsersPagination } from '../models/users.model';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL: string = `${environnement.apiUrl}/users`
  http=inject(HttpClient)
   
    getList(limit : string , page : string , search : string):Observable<UsersPagination>{
      let params = new HttpParams();
      params = params.append('limit', limit);
      params = params.append('page', page);
      if(search){
        params = params.append('search', search)
      };
      return this.http.get<UsersPagination>(this.baseURL,{params})
    }
  
    addNewOne(user: User):Observable<null>{
      return this.http.post<null>(this.baseURL,{user})
    }
  
    readOne(id:string):Observable<User>{
      return this.http.get<User>(`${this.baseURL}/${id}`)
    }
  
    editOne(user: User):Observable<User>{
      return this.http.put<User>(`${this.baseURL}/${user._id}`,{user})
    }
  
    deleteOne(id:string):Observable<any>{
      return this.http.delete<any>(`${this.baseURL}/${id}`)
    }
  
  
}
