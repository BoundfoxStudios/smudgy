import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CONFIGURATION, PlayerModuleConfiguration } from './player-module.configuration';
import { PlayerService } from './services/player.service';
import { PlayerEffects } from './state/player.effects';
import { playerReducer } from './state/player.reducers';
import { playerFeatureKey } from './state/player.selectors';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(playerFeatureKey, playerReducer), EffectsModule.forFeature([PlayerEffects])],
  providers: [PlayerService],
})
export class PlayerModule {
  static forRoot(configuration: PlayerModuleConfiguration): ModuleWithProviders<PlayerModule> {
    return {
      ngModule: PlayerModule,
      providers: [{ provide: CONFIGURATION, useValue: configuration }],
    };
  }
}
