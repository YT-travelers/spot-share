import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateRoutePageComponent } from './create-route-page.component';
import { AddSpotPageModule } from '../add-spot-page/add-spot-page.module';
import {MatTabsModule} from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    CreateRoutePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
    MatTabsModule,
    AddSpotPageModule,
  ],
  providers: [],
})
export class CreateRoutePageModule { }
