import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as UserActions from './user.actions';

export interface State {
  users: User[];
  loading: boolean;
  err: string | null;
}

const initState: State = {
  err: null,
  loading: false,
  users: [],
};

export const userReducer = createReducer(
  initState,
  on(UserActions.addSuccess, (s, a) => ({
    ...s,
    users: [...s.users, a.user],
  })),
  on(UserActions.updateSeccess, (s, a) => {
    const users = [...s.users];
    const updateUserIndex = users.findIndex(u => u.uuid == a.id);
    users[updateUserIndex] = a.user;
    return { ...s, users };
  }),
  on(UserActions.fetchUsers, s => ({ ...s, loading: true, err: null })),
  on(UserActions.setUsers, (s, a) => ({
    ...s,
    loading: false,
    users: a.users,
  })),
  on(UserActions.deleteSuccess, (s, a) => ({
    ...s,
    users: s.users.filter(u => u.uuid !== a.id),
  }))
);
