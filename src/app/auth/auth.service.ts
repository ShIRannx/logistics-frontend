import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(time: number) {
    this.logoutTimer = setTimeout(
      () => this.store.dispatch(authActions.logout()),
      time
    );
  }

  clearLogoutTimer() {
    clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
  }
}
