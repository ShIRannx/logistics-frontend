import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { getAuthToken } from './store/auth.selector';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.store.select(getAuthToken).pipe(
      take(1),
      exhaustMap(token =>
        next.handle(
          token
            ? request.clone({
                headers: new HttpHeaders().set(
                  'Authorization',
                  `Bearer ${token}`
                ),
              })
            : request
        )
      )
    );
  }
}
