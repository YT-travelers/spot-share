import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailTimeBeanComponent } from './route-detail-time-bean.component';

@NgModule({
  declarations: [
    RouteDetailTimeBeanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
  ],
  exports: [
    RouteDetailTimeBeanComponent,
  ],
  providers: [],
})
export class RouteDetailTimeBeanModule { }
