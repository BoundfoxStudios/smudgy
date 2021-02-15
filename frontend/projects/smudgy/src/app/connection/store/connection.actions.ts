import { createAction, props } from '@ngrx/store';
import { NetworkState } from '../services/hub.service';

export const initConnection = createAction('[Connection] Init');
export const changeConnectionState = createAction('[Connection] Change State', props<{ state: NetworkState }>());
