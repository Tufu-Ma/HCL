import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './format/login/login.component';

import { HomeComponent } from './shared/home/home.component';
import { AddGameComponent } from './shared/add-game/add-game.component';
import { AddGameDetailComponent } from './shared/add-game-detail/add-game-detail.component';
import { AboutMeComponent } from './shared/about-me/about-me.component';
import { PromotionComponent } from './shared/promotion/promotion.component';
import { GameDetailComponent } from './shared/game-detail/game-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch:'full' },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'promotion', component: PromotionComponent },
  { path: 'addgame', component: AddGameComponent },
  { path: 'addgame-detail/:id', component: AddGameDetailComponent },
  { path: 'game/:id', component: GameDetailComponent },
  { path: 'login', component: LoginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
