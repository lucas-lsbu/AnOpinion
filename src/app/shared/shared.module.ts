import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { TextAreaFieldComponent } from './components/text-area-field/text-area-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';



@NgModule({
  declarations: [
    InputFieldComponent,
    PostCardComponent,
    TextAreaFieldComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    InputFieldComponent,
    PostCardComponent,
    TextAreaFieldComponent,
    CommentsComponent
  ]
})
export class SharedModule { }
