import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { CreateRoutePageComponent } from './create-route-page.component';
import { RouteDetailChecklistBeanModule } from '../route-detail-bean/route-detail-checklist-bean/route-detail-checklist-bean.module';
import { RouteDetailMealBeanModule } from '../route-detail-bean/route-detail-meal-bean/route-detail-meal-bean.module';
import { RouteDetailMemoBeanModule } from '../route-detail-bean/route-detail-memo-bean/route-detail-memo-bean.module';
import { RouteDetailMoveBeanModule } from '../route-detail-bean/route-detail-move-bean/route-detail-move-bean.module';

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
    RouteDetailChecklistBeanModule,
    RouteDetailMealBeanModule,
    RouteDetailMemoBeanModule,
    RouteDetailMoveBeanModule,
  ],
  providers: [],
})
export class CreateRoutePageModule { }
