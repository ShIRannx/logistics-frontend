import { createAction, props } from '@ngrx/store';
import { User } from '../auth.model';

const PREFIX = '[Auth]';

interface Credential {
  username: string;
  password: string;
}

// Actions Impl
export const authenticateSuccess = createAction(
  `${PREFIX} Authenticate Success`,
  props<{ user: User; redirect: boolean }>()
);
export const loginStart = createAction(
  `${PREFIX} Login Start`,
  props<Credential>()
);
export const authenticateFail = createAction(
  `${PREFIX} Authenticate Fail`,
  props<{ error: string }>()
);
export const signupStart = createAction(
  `${PREFIX} Signup Start`,
  props<Credential>()
);

export const logout = createAction(`${PREFIX} Logout`);
export const autoLogin = createAction(`${PREFIX} Auto Login`);
