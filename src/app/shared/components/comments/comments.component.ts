import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {

  @Input() postId!: string;

  commentsList: Array<any> = [];

  constructor(private commentsService: CommentsService) {
  }

  async ngOnInit() {
    const response = await this.commentsService.getComments(this.postId)

    response.forEach((doc) => {
      this.commentsList.push({...doc.data(), id: doc.id})
    })

  }


}
