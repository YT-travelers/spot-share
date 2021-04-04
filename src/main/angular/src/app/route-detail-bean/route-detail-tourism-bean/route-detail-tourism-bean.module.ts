import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailTourismBeanComponent } from './route-detail-tourism-bean.component';

@NgModule({
  declarations: [
    RouteDetailTourismBeanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MatIconModule,
  ],
  exports: [
    RouteDetailTourismBeanComponent,
  ],
  providers: [],
})
export class RouteDetailTourismBeanModule { }
