import { ClipboardModule } from '@angular/cdk/clipboard';
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
import { CardComponent } from './modules/ui/components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { DrawComponent } from './components/game/draw/draw.component';
import { SmudgyComponent } from './components/game/draw/smudgy/smudgy.component';
import { GameComponent } from './components/game/game.component';
import { GuessComponent } from './components/game/guess/guess.component';
import { LobbyComponent } from './modules/session/components/lobby/lobby.component';
import { PlayComponent } from './components/game/play/play.component';
import { BrushSelectorComponent } from './components/game/toolbar/brush-selector/brush-selector.component';
import { ColorSelectorComponent } from './components/game/toolbar/color-selector/color-selector.component';
import { ToolbarComponent } from './components/game/toolbar/toolbar.component';
import { UserListComponent } from './modules/session/components/user-list/user-list.component';
import { HeaderComponent } from './components/header/header.component';
import { RootComponent } from './components/root/root.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ConnectionModule } from './modules/connection/connection.module';
import { DebugModule } from './modules/debug/debug.module';
import { CanvasRetinaDirective } from './directives/canvas-retina.directive';
import { MouseDirective } from './directives/mouse.directive';
import { TRANSLATIONS_DE } from './i18n/de';
import { TRANSLATIONS_EN } from './i18n/en';
import { PlayerModule } from './modules/player/player.module';
import { SessionModule } from './modules/session/session.module';
import { UiModule } from './modules/ui/ui.module';

@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    FooterComponent,
    DrawComponent,
    PlayComponent,
    GuessComponent,
    SmudgyComponent,
    MouseDirective,
    ToolbarComponent,
    BrushSelectorComponent,
    ColorSelectorComponent,
    CanvasRetinaDirective,
    GameComponent,
    WelcomeComponent,
  ],
  imports: [
    UiModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    FontAwesomeModule,
    SessionModule,
    DebugModule.forRoot({ baseNamespace: 'smudgy' }),
    StoreModule.forRoot<AppState>({} as any), // TODO: can we make this better?
    EffectsModule.forRoot(),
    ConnectionModule.forRoot({
      hubUrl: environment.gameConfiguration.hubsBaseUrl,
    }),
    PlayerModule.forRoot({ startGameUrl: '/game' }),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  bootstrap: [RootComponent],
})
export class AppModule {
  constructor(translateService: TranslateService) {
    translateService.setTranslation('en', TRANSLATIONS_EN);
    translateService.setTranslation('de', TRANSLATIONS_DE);

    translateService.setDefaultLang('en');
    translateService.use(environment.production ? translateService.getBrowserLang() : 'de');
  }
}
