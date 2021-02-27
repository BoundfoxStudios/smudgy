import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { LobbyComponent } from './components/game/lobby/lobby.component';
import { PlayComponent } from './components/game/play/play.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

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
    component: GameComponent,
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
