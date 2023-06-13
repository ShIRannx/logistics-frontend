import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';

const USER_PREFIX = '[user]';
const USERS_PREFIX = '[users]';

export const deleteUser = createAction(
  `${USER_PREFIX} Delete User`,
  props<{ id: string }>()
);
export const deleteSuccess = createAction(
  `${USER_PREFIX} Delete Success`,
  props<{ id: string }>()
);
export const updateUser = createAction(
  `${USER_PREFIX} Update User`,
  props<{ id: string; password: string; username: string; authz: boolean }>()
);
export const updateSeccess = createAction(
  `${USER_PREFIX} Update Success`,
  props<{ user: User; id: string }>()
);
export const setUsers = createAction(
  `${USERS_PREFIX} Set User`,
  props<{ users: User[] }>()
);
export const addUser = createAction(
  `${USER_PREFIX} Add User`,
  props<{ username: string; password: string; authz: boolean }>()
);
export const addSuccess = createAction(
  `${USER_PREFIX} Add Success`,
  props<{ user: User }>()
);
export const fetchUsers = createAction(`${USERS_PREFIX} Fetch Users`);
