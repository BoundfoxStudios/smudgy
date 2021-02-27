import { createAction, props } from '@ngrx/store';
import { Player } from './player.state';

export const playerLoad = createAction('[Player] Load');
export const playerLoadSuccess = createAction('[Player] Load Success', props<{ player: Player }>());
export const playerLoadFail = createAction('[Player] Load Fail');

export const playerRegister = createAction('[Player] Register', props<{ name: string }>());
export const playerRegisterSuccess = createAction('[Player] Register Success', props<{ player: Player }>());
export const playerRegisterFail = createAction('[Player] Register Fail');

export const playerLogin = createAction('[Player] Login', props<{ player: Player }>());
export const playerLoginSuccess = createAction('[Player] Login Success');
export const playerLoginFail = createAction('[Player] Login Fail');
