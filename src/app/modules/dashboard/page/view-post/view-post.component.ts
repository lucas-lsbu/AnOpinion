import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/shared/services/Post';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  fetchedPost!: any;

  constructor(private route: ActivatedRoute, private post: PostService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.post.fetchPost(id!)
      .then((e) => {
        this.fetchedPost = e.data();
      })
  }

}
