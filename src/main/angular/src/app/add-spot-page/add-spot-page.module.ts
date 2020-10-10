import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddSpotPageComponent } from './add-spot-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ImageInputModule } from '../shared/image-input/image-input.module';

@NgModule({
  declarations: [
    AddSpotPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MatIconModule,
    MatAutocompleteModule,
    ImageInputModule,
  ],
  exports: [
    AddSpotPageComponent,
  ],
  providers: [],
})
export class AddSpotPageModule { }
