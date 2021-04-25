import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailHotelBeanComponent } from './route-detail-hotel-bean.component';

@NgModule({
  declarations: [
    RouteDetailHotelBeanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MatIconModule,
  ],
  exports: [
    RouteDetailHotelBeanComponent,
  ],
  providers: [],
})
export class RouteDetailHotelBeanModule { }
