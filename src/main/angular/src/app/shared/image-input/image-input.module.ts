import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ImageInputComponent } from './image-input.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ImageInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    MatIconModule,
  ],
  exports: [
    ImageInputComponent,
  ],
  providers: [],
})
export class ImageInputModule { }
