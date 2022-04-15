import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { AppComponent } from './app.component';
import { LandingPageHeaderComponent } from './landing-page/landing-page-header/landing-page-header.component';
import { LandingPageFooterComponent } from './landing-page/landing-page-footer/landing-page-footer.component';
import { LandingPageMainComponent } from './landing-page/landing-page-main/landing-page-main.component';
import { LandingPageNavbarComponent } from './landing-page/landing-page-navbar/landing-page-navbar.component';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';

// Services
import { ScrollService } from './landing-page/services/scroll.service';
import { SnakeGameComponent } from './snake-game/components/snake-game/snake-game.component';
import { SnakeCanvasComponent } from './snake-game/components/snake-canvas/snake-canvas.component';
import { SnakeConfigService } from './snake-game/services/snake-config.service';
import { LandingPageConfigService } from './landing-page/services/landing-page-config.service';
import { AmobaGameComponent } from './amoba-game/components/amoba-game/amoba-game.component';
import { AmobaCanvasComponent } from './amoba-game/components/amoba-canvas/amoba-canvas.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageHeaderComponent,
    LandingPageFooterComponent,
    LandingPageMainComponent,
    LandingPageNavbarComponent,
    LandingPageComponent,
    SnakeGameComponent,
    SnakeCanvasComponent,
    AmobaGameComponent,
    AmobaCanvasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    ScrollService,
    { provide: Window, useValue: window },
    SnakeConfigService,
    LandingPageConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
