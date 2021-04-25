import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailRestaurantBeanComponent } from './route-detail-restaurant-bean.component';

@NgModule({
  declarations: [
    RouteDetailRestaurantBeanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MatIconModule,
  ],
  exports: [
    RouteDetailRestaurantBeanComponent,
  ],
  providers: [],
})
export class RouteDetailRestaurantBeanModule { }
