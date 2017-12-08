import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { TeamComponent } from './components/team/team.component';
import { EventComponent } from './components/event/event.component';

// Services
import { TeamService } from './services/team.service';
import { EventService } from './services/event.service';
import { FooterComponent } from './components/footer/footer.component';
import { GameComponent } from './components/game/game.component';
import { GameService } from './services/game.service';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    EventComponent,
    FooterComponent,
    GameComponent,
    GameDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    TeamService,
    EventService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
