import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
