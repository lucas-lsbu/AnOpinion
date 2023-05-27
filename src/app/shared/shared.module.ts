import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { PostCardComponent } from './components/post-card/post-card.component';



@NgModule({
  declarations: [
    InputFieldComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputFieldComponent,
    PostCardComponent
  ]
})
export class SharedModule { }
