import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamComponent
  },
  {
    path: '**',
    component: TeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
