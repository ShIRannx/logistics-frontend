import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import * as fromApp from '../../store/app.reducer';

export const loginGuard = () => {
  const store = inject<Store<fromApp.AppState>>(Store);
  const router = inject(Router);
  return store.select('auth').pipe(
    take(1),
    map(state => state.user),
    map(user => (user ? true : router.createUrlTree(['/auth'])))
  );
};
