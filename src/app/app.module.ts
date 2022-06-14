import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WatchComponent } from './watch/watch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'

import {MaterialExampleModule} from '../material.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { RelatedVideosSectionComponent } from './related-videos-section/related-videos-section.component';
import { ResultsComponent } from './results/results.component';
import { MiniSideNavComponent } from './mini-side-nav/mini-side-nav.component';
import { ChannelComponent } from './channel/channel.component';

function initializeYoutubeService(): Promise<any>{
  return (new Promise((resolve, reject) => gapi.load('client', () => {
      gapi.client.init({
        apiKey: "AIzaSyC8nhcuvQDfbipM6yK_bCclfnfyL_cwTno",
        clientId: "900118353356-hc2rv9rnvedf54o5tp1bg1fdu1a0rots.apps.googleusercontent.com",
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        scope: "https://www.googleapis.com/auth/youtube.readonly"
        })
        .then(() => {
          console.log("gapi initialized")
          resolve(gapi.client)
        })
      })
    )
  )
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WatchComponent,
    SidenavbarComponent,
    HomeComponent,
    CommentSectionComponent,
    RelatedVideosSectionComponent,
    ResultsComponent,
    MiniSideNavComponent,
    ChannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    MaterialExampleModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => initializeYoutubeService,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
