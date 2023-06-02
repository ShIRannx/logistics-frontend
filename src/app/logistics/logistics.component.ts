import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
// import { WebSocketSubject } from 'rxjs/webSocket';
// import { environment } from 'src/environments/environment.development';
import { Logistics } from './logistics.model';
import * as fromApp from '../store/app.reducer';
import { debounceTime, filter, map, Observable } from 'rxjs';
import * as LogisticsActions from './store/logistics.actions';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.css'],
})
export class LogisticsComponent {
  // ws$ = new WebSocketSubject<any>(environment.logisticsEndpoint);
  logisticses: Observable<{ logisticses: Logistics[] }>;
  trackingNumbersForm = this.fb.group({
    trackingNumbers: ['', [Validators.required, Validators.minLength(8)]],
  });
  // : {
  //   [k: string]: { context: { time: number; desc: string }[] | null };
  // } = {};

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<fromApp.AppState>
  ) {
    this.logisticses = this.store.select('logistics');
    this.monitorForm();
    // this.ws$.subscribe(
    //   (logistics: Logistics) =>
    //     (this.logisticses[logistics.tn] = { context: logistics.context })
    // );
  }

  monitorForm() {
    this.trackingNumbersForm.valueChanges
      .pipe(
        debounceTime(1000),
        filter(() => this.trackingNumbersForm.valid),
        map(val => val.trackingNumbers),
        map(trackingNumbersRaw =>
          trackingNumbersRaw
            ?.replace(/^\s*[\r\n]/gm, '')
            .replace(/\s+/gm, ' ')
            .replace(/[\r\n]/g, ' ')
            .trim()
            .split(' ')
        )
      )
      .subscribe(trackingNumbers => {
        if (!trackingNumbers) return;
        this.store.dispatch(LogisticsActions.searchStart({ trackingNumbers }));
      });
    // .getRawValue();
    // this.ws$.next({ trackingNumbers });
    // trackingNumbers.forEach(tn => (this.logisticses[tn] = { context: null }));
  }
}
