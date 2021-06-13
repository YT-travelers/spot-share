import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddActivityPageComponent } from './add-activity-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ImageInputModule } from 'src/app/shared/component/spot-image-input/spot-image-input.module';

@NgModule({
  declarations: [
    AddActivityPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    ImageInputModule,
  ],
  exports: [
    AddActivityPageComponent,
  ],
  providers: [],
})
export class AddActivityPageModule { }
