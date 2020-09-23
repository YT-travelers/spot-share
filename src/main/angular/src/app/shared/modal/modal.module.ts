import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalContent } from './modal.component';

@NgModule({
  declarations: [
    ModalContent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
  ],entryComponents: [
  ],
  providers: [],
})
export class ModalModule { }
