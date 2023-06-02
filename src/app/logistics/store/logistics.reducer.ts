import { createReducer, on } from '@ngrx/store';
import { Logistics } from '../logistics.model';
import * as fromLogistics from './logistics.actions';

export interface State {
  logisticses: Logistics[];
}

const initState: State = {
  logisticses: [],
};

export const logisticsReducer = createReducer(
  initState,
  on(fromLogistics.searchStart, (state, action) => {
    return {
      ...state,
      logisticses: action.trackingNumbers.map(tn => ({
        tn,
        err: '',
        context: null,
      })),
    };
  }),
  on(fromLogistics.setLogistics, (state, action) => {
    const logisticses = [...state.logisticses];
    const updateIndex = logisticses.findIndex(
      l => l.tn === action.logistics.tn
    );
    logisticses[updateIndex] = action.logistics;
    return { ...state, logisticses: logisticses };
  })
);
