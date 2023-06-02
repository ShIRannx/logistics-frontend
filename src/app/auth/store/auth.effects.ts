import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from '../auth.model';
import { environment } from '../../../environments/environment';
import * as AuthActios from './auth.actions';
import { Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '../auth.service';

interface AuthResp {
  authz: boolean;
  idToken: string;
  localId: string;
  username: string;
  expiresIn: string;
}

const handleAuthentication = (resp: AuthResp) => {
  const { localId, authz, username, idToken, expiresIn } = resp;
  const expirationDate = new Date(Date.now() + +expiresIn * 1000);
  const user = new User(localId, authz, username, idToken, expirationDate);
  localStorage.setItem('credentials', JSON.stringify(user));
  return AuthActios.authenticateSuccess({ user: user, redirect: true });
};

const handleErr = (err: HttpErrorResponse) => {
  const errMsg = err.error?.error?.message ?? 'Unknow Error Occurred!';
  return of(AuthActios.authenticateFail({ error: errMsg }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private action$: Actions,
    private http: HttpClient,
    private authSvc: AuthService
  ) {}

  authLogin = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActios.loginStart),
      switchMap(credentials => {
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        return this.http
          .post<AuthResp>(environment.authEndpoint, formData)
          .pipe(
            tap(resp => this.authSvc.setLogoutTimer(+resp.expiresIn * 1000)),
            map(handleAuthentication),
            catchError(handleErr)
          );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActios.authenticateSuccess),
        tap(state => {
          if (!state.redirect) return;
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActios.autoLogin),
      map(() => {
        const rawUser = <User>(
          JSON.parse(localStorage.getItem('credentials') ?? '{}')
        );
        const user = plainToInstance(User, rawUser);
        if (!user?.token) return { type: 'DUMMY' };
        return AuthActios.authenticateSuccess({ user: user, redirect: false });
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActios.logout),
        tap(() => {
          this.authSvc.clearLogoutTimer();
          localStorage.removeItem('credentials');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}
