import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SpotImageInputComponent } from './spot-image-input.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SpotImageInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    MatIconModule,
  ],
  exports: [
    SpotImageInputComponent,
  ],
  providers: [],
})
export class ImageInputModule { }
