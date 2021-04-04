import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailMealComponent } from './route-detail-meal-bean.component';

@NgModule({
  declarations: [
    RouteDetailMealComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MatIconModule,
  ],
  exports: [
    RouteDetailMealComponent,
  ],
  providers: [],
})
export class RouteDetailMealBeanModule { }
