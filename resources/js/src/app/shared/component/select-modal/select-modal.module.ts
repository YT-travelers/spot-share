import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SelectModalComponent } from './select-modal.component';

@NgModule({
  declarations: [
    SelectModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
  ], entryComponents: [
  ],
  providers: [],
})
export class SelectModalModule { }
