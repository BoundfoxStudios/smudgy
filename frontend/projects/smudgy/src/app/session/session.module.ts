import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '../ui/ui.module';
import { LobbyComponent } from './components/lobby/lobby.component';
import { SessionComponent } from './components/session/session.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { InviteComponent } from './components/invite/invite.component';

@NgModule({
  declarations: [LobbyComponent, UserListComponent, SessionComponent, InviteComponent],
  exports: [LobbyComponent, UserListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    UiModule,
    ClipboardModule,
    RouterModule,
    /*StoreModule.forFeature(sessionFeatureKey, sessionReducer),
    EffectsModule.forFeature([SessionEffects]),*/
  ],
})
export class SessionModule {}
