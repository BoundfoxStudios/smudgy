import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './components/root/root.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DrawComponent } from './components/game/draw/draw.component';
import { GameComponent } from './components/game/game.component';
import { UserListComponent } from './components/game/user-list/user-list.component';
import { GuessComponent } from './components/game/guess/guess.component';
import { SmudgyComponent } from './components/game/draw/smudgy/smudgy.component';
import { MouseDirective } from './directives/mouse.directive';

@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    FooterComponent,
    DrawComponent,
    GameComponent,
    UserListComponent,
    GuessComponent,
    SmudgyComponent,
    MouseDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {
}
