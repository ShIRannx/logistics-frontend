import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { of, switchMap, take } from 'rxjs';
import { getUsers } from './store/user.selector';
import * as UserActions from './store/user.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver {
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}
  resolve() {
    return this.store.select(getUsers).pipe(
      switchMap(users => {
        if (!users.length) {
          this.store.dispatch(UserActions.fetchUsers());
          return this.actions$.pipe(ofType(UserActions.setUsers), take(1));
        } else return of({ users });
      })
    );
  }
}
