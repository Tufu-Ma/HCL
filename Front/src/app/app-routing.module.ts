import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './format/login/login.component';
import { HistoryComponent } from './shared/history/history.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

import { ValorantComponent } from './game/valorant/valorant.component';

import { HomeComponent } from './shared/home/home.component';
import { AddGameComponent } from './shared/add-game/add-game.component';
import { AddGameDetailComponent } from './shared/add-game-detail/add-game-detail.component';
import { AboutMeComponent } from './shared/about-me/about-me.component';
import { PromotionComponent } from './shared/promotion/promotion.component';
import { PromotionDetailComponent } from './shared/promotion-detail/promotion_detail.component';
import { PaymentComponent } from './shared/payment/payment.component';
import { GameDetailComponent } from './shared/game-detail/game-detail.component';

import { TermgameComponent } from './shared/termgame/termgame.component';
import { LolpcComponent } from './game/lolpc/lolpc.component';
import { WildriftComponent } from './game/wildrift/wildrift.component';
import { TeamfightTacticComponent } from './game/teamfight-tactic/teamfight-tactic.component';
import { Lol2xkoComponent } from './game/lol2xko/lol2xko.component';
import { SevenknightsrebirthComponent } from './game/sevenknightsrebirth/sevenknightsrebirth.component';
import { Pathofexile2Component } from './game/pathofexile2/pathofexile2.component';
import { MarvelrivalsComponent } from './game/marvelrivals/marvelrivals.component';
import { PokemonuniteComponent } from './game/pokemonunite/pokemonunite.component';
import { ArenaBreakoutComponent } from './game/arena-breakout/arena-breakout.component';
import { DeltaforcesteampcComponent } from './game/deltaforcesteampc/deltaforcesteampc.component';
import { HonkaistarrailComponent } from './game/honkaistarrail/honkaistarrail.component';
import { GenshinImpactComponent } from './game/genshin-impact/genshin-impact.component';
import { ZenlessZeroZoneComponent } from './game/zenless-zero-zone/zenless-zero-zone.component';
import { WutheringwaveComponent } from './game/wutheringwave/wutheringwave.component';
import { CheckoutComponent } from './payment/checkout.component';
import { GiftcardListComponent } from './giftcard/giftcard-list/giftcard-list.component';
import { GiftcardDetailComponent } from './giftcard/giftcard-detail/giftcard-detail.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { SubscriptionDetailComponent } from './subscription/subscription-detail/subscription-detail.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch:'full' },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'promotion', component: PromotionComponent },
  { path: 'promotion-detail/:id', component: PromotionDetailComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'addgame', component: AddGameComponent },
  { path: 'addgame-detail/:id', component: AddGameDetailComponent },
  { path: 'games/:id', component: GameDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'termgame', component: TermgameComponent },
  { path: 'game/valorant', component: ValorantComponent },
  { path: 'game/lolpc', component: LolpcComponent },
  { path: 'game/wildrift', component: WildriftComponent },
  { path: 'game/teamfight-tactic', component: TeamfightTacticComponent },
  { path: 'game/2xko', component: Lol2xkoComponent },
  { path: 'game/sevenknightsrebirth', component: SevenknightsrebirthComponent },
  { path: 'game/pathofexile2', component: Pathofexile2Component },
  { path: 'game/marvelrivals', component: MarvelrivalsComponent },
  { path: 'game/pokemonunite', component: PokemonuniteComponent },
  { path: 'game/arena-breakout', component: ArenaBreakoutComponent },
  { path: 'game/deltaforcesteampc', component: DeltaforcesteampcComponent },
  { path: 'game/honkaistarrail', component: HonkaistarrailComponent },
  { path: 'game/genshin-impact', component: GenshinImpactComponent },
  { path: 'game/zenless-zero-zone', component: ZenlessZeroZoneComponent },
  { path: 'game/wuthering-wave', component: WutheringwaveComponent }
  ,{ path: 'checkout', component: CheckoutComponent }
  ,{ path: 'giftcard', component: GiftcardListComponent }
  ,{ path: 'giftcard/:id', component: GiftcardDetailComponent }
  ,{ path: 'subscription', component: SubscriptionListComponent }
  ,{ path: 'subscription/:id', component: SubscriptionDetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled'  // เลื่อนไปบนสุดเมื่อเปลี่ยนหน้า
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
