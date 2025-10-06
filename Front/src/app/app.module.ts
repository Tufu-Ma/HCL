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



@NgModule({
  declarations: [
    AppComponent,
    HeaderNavbarComponent,
    FooterNavbarComponent,
    HomeComponent,
    AddGameComponent,
    AddGameDetailComponent,
    AboutMeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

