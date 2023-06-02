import { createReducer, on } from '@ngrx/store';
import { User } from '../auth.model';
import * as authActions from './auth.actions';
export interface State {
  loading: boolean;
  user: User | null;
  err: string | null;
}

const initState: State = {
  user: null,
  err: null,
  loading: false,
};

export const AuthReducer = createReducer(
  initState,
  on(authActions.authenticateSuccess, (state, action) => ({
    ...state,
    err: null,
    loading: false,
    user: action.user,
  })),
  on(authActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    loading: false,
    err: action.error,
  })),
  on(authActions.loginStart, authActions.signupStart, state => ({
    ...state,
    err: null,
    loading: true,
  })),
  on(authActions.logout, state => ({ ...state, user: null }))
);
