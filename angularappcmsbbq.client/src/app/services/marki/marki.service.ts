import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, switchMap } from 'rxjs';
import { Marka } from '../../models/marka';

@Injectable({
  providedIn: 'root'
})
export class MarkiService {

  constructor(
    private http: HttpClient
  ) { }

  api: string = 'https://localhost:44328/api/marki';


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.api}`);
  }


  get(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }


  create(object: Marka): Observable<any> {
    return this.http.post<any>(`${this.api}`, object);
  }

  edit(id: string, object: Marka): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, object);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
  

}
