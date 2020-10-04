import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { InputRouteTitleModalContent } from './input-route-title-modal.component';

@NgModule({
  declarations: [
    InputRouteTitleModalContent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
  ],entryComponents: [
  ],
  providers: [],
})
export class InputRouteTitleModalModule { }
