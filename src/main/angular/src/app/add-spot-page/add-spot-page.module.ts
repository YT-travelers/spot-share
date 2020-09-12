import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddSpotPageComponent } from './add-spot-page.component';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  exports: [
    AddSpotPageComponent,
  ],
  providers: [],
})
export class AddSpotPageModule { }
