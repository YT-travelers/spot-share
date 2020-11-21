import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SelectModalModule } from './shared/select-modal/select-modal.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddSpotPageModule } from './add-spot-page/add-spot-page.module'
import { CreateRoutePageModule } from './create-route-page/create-route-page.module';
import { ShowContainerPageModule } from './show-container-page/show-container-page.module';
import { ShowSpotPageModule } from './show-spot-page/show-spot-page.module';
import { ShowRoutePageModule } from './show-route-page/show-route-page.module';
import { InputRouteNameModalModule } from './shared/input-route-name-modal/input-route-name-modal.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddSpotPageModule,
    CreateRoutePageModule,
    ShowContainerPageModule,
    ShowSpotPageModule,
    ShowRoutePageModule,
    SelectModalModule,
    InputRouteNameModalModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MatIconModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-center',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
