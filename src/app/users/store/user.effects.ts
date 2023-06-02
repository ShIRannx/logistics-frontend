import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, of, switchMap, withLatestFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import * as UserActions from './user.actions';
import * as fromApp from '../../store/app.reducer';
import { getUsers } from './user.selector';

interface FetchResponse {
  users: User[];
}
interface UserReponse {
  user: User;
}

@Injectable()
export class UserEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}

  fetchUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUsers),
      withLatestFrom(this.store.select(getUsers)),
      switchMap(([_, users]) => {
        return !users.length || users.length === 1
          ? this.http
              .get<FetchResponse>(environment.userEndpoint)
              .pipe(map(resp => UserActions.setUsers({ users: resp.users })))
          : of();
      })
    )
  );

  addUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      concatMap(a =>
        this.http
          .post<UserReponse>(environment.userEndpoint, {
            params: {
              authz: a.authz,
              password: a.password,
              username: a.username,
            },
          })
          .pipe(map(resp => UserActions.addSuccess({ user: resp.user })))
      )
    )
  );

  deleteUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(a =>
        this.http
          .delete(`${environment.userEndpoint}/${a.id}`)
          .pipe(map(() => UserActions.deleteSuccess({ id: a.id })))
      )
    )
  );

  // updateUser = createEffect(()=>)
}
