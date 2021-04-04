import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ShowTourismPageComponent } from './show-tourism-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    ShowTourismPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
    MatIconModule,
    MatProgressSpinnerModule,
    OverlayModule,
  ],
  exports: [
    ShowTourismPageComponent,
  ],
  entryComponents: [
    MatSpinner,
  ],
  providers: [],
})
export class ShowTourismPageModule { }
