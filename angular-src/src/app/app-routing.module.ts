import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { TeamComponent } from './components/team/team.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent
  },
  {
    path: 'game/:id',
    component: GameDetailComponent
  },
  {
    path: '**',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
