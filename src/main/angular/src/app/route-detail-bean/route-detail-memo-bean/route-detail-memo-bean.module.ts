import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailMemoBeanComponent } from './route-detail-memo-bean.component';

@NgModule({
  declarations: [
    RouteDetailMemoBeanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
  ],
  exports: [
    RouteDetailMemoBeanComponent,
  ],
  providers: [],
})
export class RouteDetailMemoBeanModule { }
