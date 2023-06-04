import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/shared/services/Post';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  fetchedPost!: any;
  postId: string;

  constructor(private route: ActivatedRoute, private post: PostService,
    private commentService: CommentsService, private authService: AuthService) {
    this.postId = this.route.snapshot.paramMap.get('id')!
  }

  ngOnInit() {
    this.post.fetchPost(this.postId)
      .then((e) => {
        this.fetchedPost = e.data();
      })
  }
  
  async addComment(input: string) {

    const response = await this.authService.getUser()
    response.subscribe((user) => {
      this.commentService.addComment(input, this.postId, user!.uid);
    })

  }

}
