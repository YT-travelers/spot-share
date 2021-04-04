import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailMoveBeanComponent } from './route-detail-move-bean.component';

@NgModule({
  declarations: [
    RouteDetailMoveBeanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MatIconModule,
  ],
  exports: [
    RouteDetailMoveBeanComponent,
  ],
  providers: [],
})
export class RouteDetailMoveBeanModule { }
