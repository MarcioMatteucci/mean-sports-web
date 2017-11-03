import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { TeamComponent } from './components/team/team.component';

// Services
import { TeamService } from './services/team.service';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
