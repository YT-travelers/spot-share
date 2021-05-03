import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailChecklistBeanComponent } from './route-detail-checklist-bean.component';

@NgModule({
  declarations: [
    RouteDetailChecklistBeanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
  ],
  exports: [
    RouteDetailChecklistBeanComponent,
  ],
  providers: [],
})
export class RouteDetailChecklistBeanModule { }
