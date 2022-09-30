import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppState } from './app.state';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RootComponent } from './components/root/root.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TRANSLATIONS_DE } from './i18n/de';
import { TRANSLATIONS_EN } from './i18n/en';
import { ConnectionModule } from './modules/connection/connection.module';
import { DebugModule } from './modules/debug/debug.module';
import { PlayerModule } from './modules/player/player.module';
import { SessionModule } from './modules/session/session.module';
import { UiModule } from './modules/ui/ui.module';
import { DrawingBoardModule } from './modules/drawing-board/drawing-board.module';

@NgModule({
  declarations: [RootComponent, HeaderComponent, FooterComponent, WelcomeComponent],
  imports: [
    UiModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    FontAwesomeModule,
    SessionModule,
    DebugModule.forRoot({ baseNamespace: 'smudgy' }),
    StoreModule.forRoot<AppState>({}), // TODO: can we make this better?
    EffectsModule.forRoot(),
    ConnectionModule.forRoot({
      url: environment.gameConfiguration.hubsBaseUrl,
    }),
    PlayerModule.forRoot({ startGameUrl: '/game' }),
    DrawingBoardModule.forRoot(),
    SessionModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  bootstrap: [RootComponent],
})
export class AppModule {
  constructor(translateService: TranslateService) {
    translateService.setTranslation('en', TRANSLATIONS_EN);
    translateService.setTranslation('de', TRANSLATIONS_DE);

    translateService.setDefaultLang('en');
    translateService.use(environment.production ? translateService.getBrowserLang() || 'de' : 'de');
  }
}
