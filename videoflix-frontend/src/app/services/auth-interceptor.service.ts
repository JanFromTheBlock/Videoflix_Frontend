import { routes } from './../app.routes';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router: Router, private as: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {Authorization: `Token ${token}`}
      });
    }
    return next.handle(request).pipe(catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          localStorage.setItem('LoggedIn', 'false');
          this.router.navigateByUrl('/login');
        }
      }
      return throwError( () => err);
    })
  );


  }
}
