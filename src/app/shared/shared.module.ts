import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { TextAreaFieldComponent } from './components/text-area-field/text-area-field.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InputFieldComponent,
    PostCardComponent,
    TextAreaFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputFieldComponent,
    PostCardComponent,
    TextAreaFieldComponent
  ]
})
export class SharedModule { }
