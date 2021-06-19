import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectAddSpotModalComponent } from './select-add-spot-modal.component';
import { ShowSpotPageModule } from 'src/app/show-spot-page/show-spot-page.module';

@NgModule({
  declarations: [
    SelectAddSpotModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ShowSpotPageModule,
  ], entryComponents: [
  ],
  providers: [],
})
export class SelectAddSpotModalModule { }
