import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmobaGameComponent } from './amoba-game/components/amoba-game/amoba-game.component';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { SnakeGameComponent } from './snake-game/components/snake-game/snake-game.component';

const routes: Routes = [

  {
    path:"portfolio",
    component:LandingPageComponent,
  },
  {
    path:"snake",
    component:SnakeGameComponent
  },
  {
    path:"amoba",
    component:AmobaGameComponent
  },
  {
    path:"**",
    redirectTo:"/portfolio",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
