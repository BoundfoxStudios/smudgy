import { ClipboardModule } from '@angular/cdk/clipboard';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { DrawComponent } from './components/game/draw/draw.component';
import { SmudgyComponent } from './components/game/draw/smudgy/smudgy.component';
import { GameComponent } from './components/game/game.component';
import { GuessComponent } from './components/game/guess/guess.component';
import { LobbyComponent } from './components/game/lobby/lobby.component';
import { PlayComponent } from './components/game/play/play.component';
import { BrushSelectorComponent } from './components/game/toolbar/brush-selector/brush-selector.component';
import { ColorSelectorComponent } from './components/game/toolbar/color-selector/color-selector.component';
import { ToolbarComponent } from './components/game/toolbar/toolbar.component';
import { UserListComponent } from './components/game/user-list/user-list.component';
import { HeaderComponent } from './components/header/header.component';
import { RootComponent } from './components/root/root.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { CanvasRetinaDirective } from './directives/canvas-retina.directive';
import { MouseDirective } from './directives/mouse.directive';
import { TRANSLATIONS_DE } from './i18n/de';
import { TRANSLATIONS_EN } from './i18n/en';
import { socketServiceInitializerFactory, socketServiceInitializerFactoryDeps } from './services/socket-service.initializer';
import { ConnectionStateComponent } from './components/connection-state/connection-state.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    FooterComponent,
    DrawComponent,
    PlayComponent,
    UserListComponent,
    GuessComponent,
    SmudgyComponent,
    MouseDirective,
    ToolbarComponent,
    BrushSelectorComponent,
    ColorSelectorComponent,
    CanvasRetinaDirective,
    LobbyComponent,
    UserInformationComponent,
    GameComponent,
    ConnectionStateComponent,
    WelcomeComponent,
    CardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, TranslateModule.forRoot(), FontAwesomeModule, ClipboardModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: socketServiceInitializerFactory,
      deps: socketServiceInitializerFactoryDeps,
      multi: true,
    },
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
