import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(readonly localStorageService: LocalStorageService,
              readonly router: Router,
              readonly authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.localStorageService.getItem('access_token');

    if (accessToken) {
      request = this.addAuthorizationHeader(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError(err => {
        console.error(err);
        if (err.status === StatusCodes.UNAUTHORIZED) {
          const refreshToken = this.localStorageService.getItem('refresh_token');
          if (refreshToken && this.authService.refreshToken(refreshToken)) {
            return next.handle(request);
          } else {
            this.localStorageService.clearLocalStorage();
          }
        }
        if (err.status === StatusCodes.BAD_REQUEST) {
          return next.handle(request);
        }
        throwError(err);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return request;
  }
}
