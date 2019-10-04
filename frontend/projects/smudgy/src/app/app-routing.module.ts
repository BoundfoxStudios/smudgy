import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/game/lobby/lobby.component';
import { PlayComponent } from './components/game/play/play.component';
import { UserInformationComponent } from './components/user-information/user-information.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-information', // TODO: change later to a start screen
  },
  {
    path: 'user-information',
    component: UserInformationComponent,
  },
  {
    path: 'game',
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
export class AppRoutingModule {
}
