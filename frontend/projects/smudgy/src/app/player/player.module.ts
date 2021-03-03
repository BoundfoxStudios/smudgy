import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PlayerInformationComponent } from './components/player-information/player-information.component';
import { CONFIGURATION, PlayerModuleConfiguration } from './player-module.configuration';
import { PlayerService } from './services/player.service';
import { PlayerEffects } from './state/player.effects';
import { playerReducer } from './state/player.reducers';
import { playerFeatureKey } from './state/player.selectors';

@NgModule({
  declarations: [PlayerInformationComponent],
  exports: [PlayerInformationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(playerFeatureKey, playerReducer),
    EffectsModule.forFeature([PlayerEffects]),
  ],
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
