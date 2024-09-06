/*import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountHandlerService } from './account-handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private lastActivityTime: any;
  //private time = 10 * 60 * 1000; // 10 min
  //private time = 10 * 60 * 100; // 1 min
  private time = 10 * 60 * 10; // 10s
  private timerClock = 10000; // odświeżanie zegara co 10 sekund w milisekundach

  constructor(private accountService: AccountHandlerService) {
    alert('ok');
    // pobranie czasu zalogowania z sesji
    let sessionModel = sessionStorage.getItem('sessionModel');
    if (sessionModel) {
      this.lastActivityTime = JSON.parse(sessionModel).startTime; 
      if (this.lastActivityTime) { 

        setInterval(() => {
          // Sprawdź, czy upłynęło więcej niż 30 minut od ostatniej aktywności
          alert('4 - ' + `${Date.now() - this.lastActivityTime}; ${this.time}`);
          if (Date.now() - this.lastActivityTime >= this.time) {
            // Wyloguj użytkownika
            //alert('3');
            //this.accountService.wyloguj();
            alert('wylogowano');
            //alert('5');
          }
        }, this.timerClock);

        //alert('6');

      } else {
        alert("this.lastActivityTime was null");
      }
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Odśwież czas ostatniej aktywności przy każdym żądaniu
    this.lastActivityTime = Date.now();

    //alert ('intercept method')
    // Dodaj token JWT do nagłówka żądania, jeśli użytkownik jest zalogowany
    let sessionModel = sessionStorage.getItem('sessionModel');
    if (sessionModel) { 
      let token = JSON.parse(sessionModel).model.token;
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
*/


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountHandlerService } from './account-handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  //private time = 10 * 60 * 1000; // 10 min
  //private time = 10 * 60 * 100; // 1 min
  private time = 10 * 60 * 10; // 10s
  private timerClock = 10000; // odświeżanie zegara co 10 sekund w milisekundach

  constructor(private accountService: AccountHandlerService) {
    //alert('ok');
    // pobranie czasu zalogowania z sesji
    let sessionModel = sessionStorage.getItem('sessionModel');
    //alert('1');
    if (sessionModel) {
      //alert('2'); 
      let sm = JSON.parse(sessionModel);
      if (sm) {
        let dataWylogowania = sm.dataWylogowania;
        if (dataWylogowania) {
          setInterval(() => {
            //alert('5');
            // Sprawdź, czy upłynęło więcej niż 30 minut od ostatniej aktywności 
            if (Date.now() >= dataWylogowania) {
              // Wyloguj użytkownika
              //alert('3');
              this.accountService.wyloguj();
              //alert('wylogowano');

              sm.dataWylogowania = null;
              sessionStorage.setItem('sessionModel', JSON.stringify(sm));
            }
          }, this.timerClock);
        }
      }
    }
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //  alert ('intercept method')
    // Dodaj token JWT do nagłówka żądania, jeśli użytkownik jest zalogowany
    let sessionModel = sessionStorage.getItem('sessionModel');
    if (sessionModel) {
      let token = JSON.parse(sessionModel).model.token;
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
