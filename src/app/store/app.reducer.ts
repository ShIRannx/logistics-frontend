import * as fromAuth from '../auth/store/auth.reducer';
import * as fromLogistics from '../logistics/store/logistics.reducer';
import * as fromUsers from '../users/store/user.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  users: fromUsers.State;
  logistics: fromLogistics.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  users: fromUsers.userReducer,
  logistics: fromLogistics.logisticsReducer,
};
