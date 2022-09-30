import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { SOCKET_SERVICE } from '../connection/services/socket.service';
import { DrawingBoardModule } from '../drawing-board/drawing-board.module';
import { GuessModule } from '../guess/guess.module';
import { UiModule } from '../ui/ui.module';
import { InviteComponent } from './components/invite/invite.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayComponent } from './components/play/play.component';
import { SessionConfigurationFormComponent } from './components/session-configuration-form/session-configuration-form.component';
import { SessionComponent } from './components/session/session.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SessionSocketService } from './services/session-socket.service';

@NgModule({
  declarations: [LobbyComponent, UserListComponent, SessionComponent, InviteComponent, SessionConfigurationFormComponent, PlayComponent],
  exports: [LobbyComponent, UserListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    UiModule,
    ClipboardModule,
    RouterModule,
    DrawingBoardModule,
    GuessModule,
  ],
})
export class SessionModule {
  static forRoot(): ModuleWithProviders<SessionModule> {
    return {
      ngModule: SessionModule,
      providers: [SessionSocketService, { provide: SOCKET_SERVICE, useExisting: SessionSocketService, multi: true }],
    };
  }
}
