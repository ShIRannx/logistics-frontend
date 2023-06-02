import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducers';

const getUserSelector = createFeatureSelector<fromUser.State>('users');

export const getUsers = createSelector(getUserSelector, state => state.users);
