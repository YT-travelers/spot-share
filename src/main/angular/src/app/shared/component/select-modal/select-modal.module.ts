import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SelectModalContent } from './select-modal.component';

@NgModule({
  declarations: [
    SelectModalContent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
  ], entryComponents: [
  ],
  providers: [],
})
export class SelectModalModule { }
