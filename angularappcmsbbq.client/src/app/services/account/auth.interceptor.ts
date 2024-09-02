import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountHandlerService } from './account-handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private lastActivityTime: number;
  private time = 10 * 60 * 1000; // 10 min

  constructor(private accountService: AccountHandlerService) {
    this.lastActivityTime = Date.now();
    setInterval(() => {
      // Sprawdź, czy upłynęło więcej niż 30 minut od ostatniej aktywności
      if (Date.now() - this.lastActivityTime >= this.time) {
        // Wyloguj użytkownika
        this.accountService.wyloguj();
      }
    }, this.time);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Odśwież czas ostatniej aktywności przy każdym żądaniu
    this.lastActivityTime = Date.now();

    // Dodaj token JWT do nagłówka żądania, jeśli użytkownik jest zalogowany
    const sessionModel = sessionStorage.getItem('sessionModel');
    if (sessionModel) { 
      const token = JSON.parse(sessionModel).model.token;
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
