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
  currentUid!: string;
  deletePostSelected: boolean = false;

  constructor(private route: ActivatedRoute, private post: PostService,
    private commentService: CommentsService, private authService: AuthService) {
    this.postId = this.route.snapshot.paramMap.get('id')!
  }

  async ngOnInit() {
    this.post.fetchPost(this.postId)
      .then((e) => {
        this.fetchedPost = e.data();
      })

    const response = await this.authService.getUser();

    response.subscribe((user) => {
      this.currentUid = user!.uid;
    })

  }

  async deletePost() {
    this.post.deletePost(this.postId);
  }
  
  async addComment(input: string) {
    this.commentService.addComment(input, this.postId, this.currentUid);
  }

}
