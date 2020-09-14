import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddSpotPageModule } from './add-spot-page/add-spot-page.module'
import { ShowSpotPageModule } from './show-spot-page/show-spot-page.module';
import { CreateRoutePageModule } from './create-route-page/create-route-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddSpotPageModule,
    ShowSpotPageModule,
    CreateRoutePageModule,
    ShowSpotPageModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MatIconModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
