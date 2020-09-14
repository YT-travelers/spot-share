import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ShowRoutePageComponent } from './show-route-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    ShowRoutePageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
    MatIconModule,
    MatProgressSpinnerModule,
    OverlayModule,
  ],entryComponents: [
    MatSpinner,
  ],
  providers: [],
})
export class ShowRoutePageModule { }
