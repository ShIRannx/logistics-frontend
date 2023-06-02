import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import * as LogisticsActions from './logistics.actions';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { getAuthToken } from 'src/app/auth/store/auth.selector';
@Injectable()
export class LogisticsEffects {
  token: string = '';
  private ws$: WebSocketSubject<any>;

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {
    this.store.select(getAuthToken).subscribe(token => {
      this.token = token ?? '';
      this.ws$ = new WebSocketSubject(
        `${environment.logisticsEndpoint}?token=${token}`
      );
    });
    this.ws$ = new WebSocketSubject(
      `${environment.logisticsEndpoint}/?token=${this.token}`
    );
  }

  searchLogistics = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LogisticsActions.searchStart),
        map(action => {
          this.ws$.next({
            trackingNumbers: action.trackingNumbers,
          });
          this.ws$.subscribe(logistics => {
            console.log(logistics);
            this.store.dispatch(LogisticsActions.setLogistics({ logistics }));
          });
        })
      ),
    { dispatch: false }
  );
}
