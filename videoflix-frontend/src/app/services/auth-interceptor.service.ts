import { routes } from './../app.routes';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router: Router, private as: AuthService, private loader: LoaderService) { }

  /**
   * This function checks if the user is logged in, when a backend request was sent. When The user is not logged in the user gets logged out an the request get intercepted. Also the function triggers the loader animation
   *
   * @param request - the desired http request to the backend
   * @param next - the next, if available, interceptpr
   * @returns - the error, if something went wrong
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();
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
    }),
    finalize(() => {
      this.loader.hide();
    })
  );
  }
}
