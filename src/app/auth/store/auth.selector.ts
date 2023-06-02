import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

const getAuthSelector = createFeatureSelector<fromAuth.State>('auth');

export const getAuthToken = createSelector(
  getAuthSelector,
  state => state.user?.token
);
