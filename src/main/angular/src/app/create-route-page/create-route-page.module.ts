import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { CreateRoutePageComponent } from './create-route-page.component';
import { AddSpotPageModule } from '../add-spot-page/add-spot-page.module';

@NgModule({
  declarations: [
    CreateRoutePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DragDropModule,
    MatIconModule,
    AddSpotPageModule,
  ],
  providers: [],
})
export class CreateRoutePageModule { }
