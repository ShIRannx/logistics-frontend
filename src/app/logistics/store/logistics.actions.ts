import { createAction, props } from '@ngrx/store';
import { Logistics } from '../logistics.model';

const PREFIX = '[logistics]';

export const searchStart = createAction(
  `${PREFIX} Search Start`,
  props<{ trackingNumbers: string[] }>()
);

export const setLogistics = createAction(
  `${PREFIX} Set Logistics`,
  props<{ logistics: Logistics }>()
);
