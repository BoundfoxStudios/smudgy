import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Player } from './player.state';

export const playerActions = createActionGroup({
  source: 'Player',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ player: Player }>(),
    'Load Fail': emptyProps(),

    Register: props<{ name: string }>(),
    'Register Success': props<{ player: Player }>(),
    'Register Fail': emptyProps(),

    Login: props<{ player: Player }>(),
    'Login Success': emptyProps(),
    'Login Fail': emptyProps(),
  },
});
