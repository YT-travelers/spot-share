import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailMealBeanComponent } from './route-detail-meal-bean.component';

@NgModule({
  declarations: [
    RouteDetailMealBeanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [
    RouteDetailMealBeanComponent,
  ],
  providers: [],
})
export class RouteDetailMealBeanModule { }
