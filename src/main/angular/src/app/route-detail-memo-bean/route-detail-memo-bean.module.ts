import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouteDetailMemoComponent } from './route-detail-memo-bean.component';

@NgModule({
  declarations: [
    RouteDetailMemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MatIconModule,
  ],
  exports: [
    RouteDetailMemoComponent,
  ],
  providers: [],
})
export class RouteDetailMemoBeanModule { }
