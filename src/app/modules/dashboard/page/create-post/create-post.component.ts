import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  stage1: boolean = true;
  stage2: boolean = false;
  stage3: boolean = false;
  stage4: boolean = false;

  categories: string[] = ['Gym', 'Health', 'Family', 'Education', 'Religion', 'Work', 'Music', 'Coding', 'Gaming'];
  selectedCategories: string[] = [];

  form = this.formBuilder.group({
    title: new FormControl('', [Validators.required, Validators.min(5)]),
    text: new FormControl('', [Validators.required, Validators.min(10)]),
    createdDate: new FormControl(new Date() as Date, Validators.required),
    categories: new FormControl([] as string[])
  })

  constructor(private formBuilder: FormBuilder, private post: PostService) { }

  onSubmit() {
    const post = {
      title: this.form.controls.title.value!,
      categories: this.form.controls.categories.value,
      createdDate: this.form.controls.createdDate.value!,
      text: this.form.controls.text.value!,
    }
    this.post.createPost(post)
  }

  async modifyCategories(category: string) {
    if (this.selectedCategories.includes(category)) {
      // remove category from selectedCategories
      const index = this.selectedCategories.indexOf(category)
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
      this.selectedCategories = [...this.selectedCategories];
      this.form.patchValue({
        categories: this.selectedCategories
      })
    } else {
      // add category to selected categories
      this.selectedCategories.push(category);
      this.selectedCategories = [...new Set(this.selectedCategories)];
      this.form.patchValue({
        categories: this.selectedCategories
      })
      
    }
  }

  // I have done it this way as I believe it looks cleaner than any other method of altering the stage
  toggleStage() {
    if (this.stage1) {
      this.stage1 = false; this.stage2 = true;
    } else if (this.stage2) {
      this.stage2 = false; this.stage3 = true;
    } else if (this.stage3) {
      this.stage3 = false; this.stage4 = true;
    }
  }

  toggleBackStage() {
    if (this.stage4) {
      this.stage4 = false; this.stage3 = true;
    } else if (this.stage3) {
      this.stage3 = false; this.stage2 = true;
    } else if (this.stage2) {
      this.stage2 = false; this.stage1 = true;
    }
  }

  ngOnInit(): void {
    
  }

}
