import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ShowSpotPageComponent } from './show-spot-page.component';

@NgModule({
  declarations: [
    ShowSpotPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [],
})
export class ShowSpotPageModule { }
