import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { CreateRoutePageComponent } from './create-route-page.component';
import { RouteDetailMoveBeanModule } from '../route-detail-move-bean/route-detail-move-bean.module';

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
    RouteDetailMoveBeanModule,
  ],
  providers: [],
})
export class CreateRoutePageModule { }
