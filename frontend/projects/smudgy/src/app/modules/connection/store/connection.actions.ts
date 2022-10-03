import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NetworkState } from '../models/network-state';

export const connectionActions = createActionGroup({
  source: 'Connection',
  events: {
    Init: emptyProps(),
    'Change State': props<{ state: NetworkState }>(),
  },
});
