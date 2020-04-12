import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [
  {
    path: '',
    component: CreateGameComponent
  },
  {
    path: 'game/:id',
    component: GameComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
