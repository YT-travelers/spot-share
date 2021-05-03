import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputRouteNameModalContent } from './input-route-name-modal.component';

@NgModule({
  declarations: [
    InputRouteNameModalContent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
  ], entryComponents: [
  ],
  providers: [],
})
export class InputRouteNameModalModule { }
