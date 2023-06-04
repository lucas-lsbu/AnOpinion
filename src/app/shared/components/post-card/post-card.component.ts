import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html'
})
export class PostCardComponent implements OnInit {

  @Input() category: string = '';
  @Input() title: string = '';
  @Input() createdDate?: Date;
  @Input() totalComments?: string;
  @Input() id!: string;

  constructor() { }

  ngOnInit() {
  }

}
