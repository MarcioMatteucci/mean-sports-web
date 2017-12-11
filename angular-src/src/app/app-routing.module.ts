import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { TeamComponent } from './components/team/team.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'teams',
    component: TeamComponent
  },
  {
    path: 'games',
    component: GameComponent
  },
  {
    path: 'games/:id',
    component: GameDetailComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
