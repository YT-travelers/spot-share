import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShowContainerPageComponent } from './show-container-page.component';
import { ShowRoutePageModule } from '../show-route-page/show-route-page.module';
import { ShowSpotPageModule } from '../show-spot-page/show-spot-page.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    ShowContainerPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MatTabsModule,
    ShowRoutePageModule,
    ShowSpotPageModule,
  ],
  exports: [
    ShowContainerPageComponent,
  ],
  providers: [],
})
export class ShowContainerPageModule { }
