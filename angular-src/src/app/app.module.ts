import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { TeamComponent } from './components/team/team.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameComponent } from './components/game/game.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

// Services
import { TeamService } from './services/team.service';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    FooterComponent,
    GameComponent,
    GameDetailComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TeamService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
