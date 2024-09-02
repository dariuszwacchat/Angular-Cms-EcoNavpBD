import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, switchMap } from 'rxjs';
import { Category } from '../../models/category';
import { TaskResult } from '../../models/taskResult';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) {
    // this.startKeepAlive();
  }


  api: string = 'https://localhost:44328/api/categories';


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.api}`);
  }

  get(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create (category: Category): Observable<any> {
    return this.http.post<any>(`${this.api}`, category);
  }

  edit(id: string, category: Category): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, category);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }



   


  startKeepAlive() {
    interval(1 * 60 * 1000) // co 1 minut
      .pipe(
        switchMap(() => this.http.get(`${this.api}/6951fb7d-4854-415d-b3fe-e1d02d742d21`))
      )
      .subscribe(response => {
        alert(response)
      }, error => {
        alert(error)
      });
  }

   

}
