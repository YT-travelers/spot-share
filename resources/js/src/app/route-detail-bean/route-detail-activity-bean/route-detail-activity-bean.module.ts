import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailActivityBeanComponent } from './route-detail-activity-bean.component';

@NgModule({
  declarations: [
    RouteDetailActivityBeanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
  ],
  exports: [
    RouteDetailActivityBeanComponent,
  ],
  providers: [],
})
export class RouteDetailActivityBeanModule { }
