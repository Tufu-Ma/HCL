import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderNavbarComponent } from './format/header-navbar/header-navbar.component';
import { FooterNavbarComponent } from './format/footer-navbar/footer-navbar.component';
import { HomeComponent } from './shared/home/home.component';
import { AddGameComponent } from './shared/add-game/add-game.component';
import { AddGameDetailComponent } from './shared/add-game-detail/add-game-detail.component';
import { AboutMeComponent } from './shared/about-me/about-me.component';
import { PromotionComponent } from './shared/promotion/promotion.component';
// ❌ ลบ import TermgameComponent เพราะเป็น standalone และใช้ผ่าน Router
// import { TermgameComponent } from './shared/termgame/termgame.component';

import { ValorantComponent } from './game/valorant/valorant.component';
import { LolpcComponent } from './game/lolpc/lolpc.component';
import { PokemonuniteComponent } from './game/pokemonunite/pokemonunite.component';
import { SevenknightsrebirthComponent } from './game/sevenknightsrebirth/sevenknightsrebirth.component';
import { HonkaistarrailComponent } from './game/honkaistarrail/honkaistarrail.component';
import { MarvelrivalsComponent } from './game/marvelrivals/marvelrivals.component';
import { Pathofexile2Component } from './game/pathofexile2/pathofexile2.component';
import { DeltaforcesteampcComponent } from './game/deltaforcesteampc/deltaforcesteampc.component';
import { WildriftComponent } from './game/wildrift/wildrift.component';
import { ArenaBreakoutComponent } from './game/arena-breakout/arena-breakout.component';
import { WutheringwaveComponent } from './game/wutheringwave/wutheringwave.component';
import { GenshinImpactComponent } from './game/genshin-impact/genshin-impact.component';
import { ZenlessZeroZoneComponent } from './game/zenless-zero-zone/zenless-zero-zone.component';
import { TeamfightTacticComponent } from './game/teamfight-tactic/teamfight-tactic.component';
import { Lol2xkoComponent } from './game/lol2xko/lol2xko.component';
import { GiftcardComponent } from './shared/giftcard/giftcard.component';
import { SubscriptionComponent } from './shared/subscription/subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddGameComponent,
    AddGameDetailComponent,
    AboutMeComponent,
    PromotionComponent,
    PokemonuniteComponent,
    SevenknightsrebirthComponent,
    HonkaistarrailComponent,
    MarvelrivalsComponent,
    Pathofexile2Component,
    DeltaforcesteampcComponent,
    WildriftComponent,
    ArenaBreakoutComponent,
    WutheringwaveComponent,
    GenshinImpactComponent,
    ZenlessZeroZoneComponent,
    TeamfightTacticComponent,
    Lol2xkoComponent,
    GiftcardComponent,
    SubscriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Import standalone components used in templates
    HeaderNavbarComponent,
    // Footer can be added when used in templates
    // FooterNavbarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
