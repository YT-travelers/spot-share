import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddRestaurantPageComponent } from './add-restaurant-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ImageInputModule } from 'src/app/shared/component/image-input/image-input.module';

@NgModule({
  declarations: [
    AddRestaurantPageComponent
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
    AddRestaurantPageComponent,
  ],
  providers: [],
})
export class AddRestaurantPageModule { }
