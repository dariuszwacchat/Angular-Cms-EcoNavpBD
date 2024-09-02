import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ApplicationRole } from '../../models/applicationRole';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient
  ) { }

  api: string = 'https://localhost:44328/api/roles';


  getAll(): Observable<any> { 
    return this.http.get<any>(`${this.api}`);
  }
   

  get(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }


  create(object: ApplicationRole): Observable<any> {
    return this.http.post<any>(`${this.api}`, object);
  }

  edit(id: string, object: ApplicationRole): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, object);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
