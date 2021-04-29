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

import { AddTourismPageModule } from 'src/app/add-spot-page/add-tourism-page/add-tourism-page.module'
import { AddRestaurantPageModule } from 'src/app/add-spot-page/add-restaurant-page/add-restaurant-page.module'
import { AddHotelPageModule } from 'src/app/add-spot-page/add-hotel-page/add-hotel-page.module'
import { AddActivityPageModule } from 'src/app/add-spot-page/add-activity-page/add-activity-page.module'
import { CreateRoutePageModule } from './create-route-page/create-route-page.module';
import { RouteDetailTourismBeanModule } from './route-detail-bean/route-detail-tourism-bean/route-detail-tourism-bean.module';
import { RouteDetailRestaurantBeanModule } from './route-detail-bean/route-detail-restaurant-bean/route-detail-restaurant-bean.module';
import { RouteDetailHotelBeanModule } from './route-detail-bean/route-detail-hotel-bean/route-detail-hotel-bean.module';
import { RouteDetailActivityBeanModule } from './route-detail-bean/route-detail-activity-bean/route-detail-activity-bean.module';
import { RouteDetailChecklistBeanModule } from './route-detail-bean/route-detail-checklist-bean/route-detail-checklist-bean.module';
import { RouteDetailMealBeanModule } from './route-detail-bean/route-detail-meal-bean/route-detail-meal-bean.module';
import { RouteDetailMemoBeanModule } from './route-detail-bean/route-detail-memo-bean/route-detail-memo-bean.module';
import { RouteDetailMoveBeanModule } from './route-detail-bean/route-detail-move-bean/route-detail-move-bean.module';
import { ShowContainerPageModule } from './show-container-page/show-container-page.module';
import { ShowTourismPageModule } from './show-tourism-page/show-tourism-page.module';
import { ShowRoutePageModule } from './show-route-page/show-route-page.module';
import { InputRouteNameModalModule } from './shared/input-route-name-modal/input-route-name-modal.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddTourismPageModule,
    AddRestaurantPageModule,
    AddHotelPageModule,
    AddActivityPageModule,
    CreateRoutePageModule,
    RouteDetailTourismBeanModule,
    RouteDetailRestaurantBeanModule,
    RouteDetailHotelBeanModule,
    RouteDetailActivityBeanModule,
    RouteDetailChecklistBeanModule,
    RouteDetailMealBeanModule,
    RouteDetailMemoBeanModule,
    RouteDetailMoveBeanModule,
    ShowContainerPageModule,
    ShowTourismPageModule,
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
