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

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    TeamService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
