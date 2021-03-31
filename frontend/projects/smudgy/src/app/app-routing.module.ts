import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PlayComponent } from './modules/session/components/play/play.component';
import { LobbyComponent } from './modules/session/components/lobby/lobby.component';
import { SessionComponent } from './modules/session/components/session/session.component';
import { HasPlayerGuard } from './modules/session/guards/has-player.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome', // TODO: change later to a start screen
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'game',
    component: SessionComponent,
    canActivate: [HasPlayerGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lobby',
      },
      {
        path: 'lobby',
        component: LobbyComponent,
      },
      {
        path: 'play',
        component: PlayComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
