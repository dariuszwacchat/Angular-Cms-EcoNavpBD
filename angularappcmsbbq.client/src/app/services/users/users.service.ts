import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUser } from '../../models/applicationUser';
import { RegisterViewModel } from '../../models/registerViewModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(
    private http: HttpClient
  ) { }

  api: string = 'https://localhost:44328/api/users';


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.api}`);
  }


  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/getUserById/${id}`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.api}/getUserByEmail/${email}`);
  }


  create(object: RegisterViewModel): Observable<any> {
    return this.http.post<any>(`${this.api}`, object);
  }

  edit(id: string, object: ApplicationUser): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, object);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
