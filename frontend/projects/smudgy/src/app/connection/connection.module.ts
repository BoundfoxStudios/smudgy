import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConnectionStateComponent } from './components/connection-state/connection-state.component';
import { CONFIGURATION, ConnectionModuleConfiguration } from './connection-module.configuration';
import { ConnectionEffects } from './store/connection.effects';
import { connectionReducer } from './store/connection.reducers';
import { connectionFeatureKey } from './store/connection.selectors';

@NgModule({
  declarations: [ConnectionStateComponent],
  exports: [ConnectionStateComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(connectionFeatureKey, connectionReducer),
    EffectsModule.forFeature([ConnectionEffects]),
    FontAwesomeModule,
  ],
})
export class ConnectionModule {
  static forRoot(configuration: ConnectionModuleConfiguration): ModuleWithProviders<ConnectionModule> {
    return {
      ngModule: ConnectionModule,
      providers: [{ provide: CONFIGURATION, useValue: configuration }],
    };
  }
}
