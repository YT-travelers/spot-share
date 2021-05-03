import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputRouteNameModalComponent } from './input-route-name-modal.component';

@NgModule({
  declarations: [
    InputRouteNameModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ], entryComponents: [
  ],
  providers: [],
})
export class InputRouteNameModalModule { }
