import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  

  postList: Array<any> = [];

  constructor(private post: PostService) { }

  async ngOnInit() {
    (await this.post.fetchPosts()).subscribe(doc => {
      doc.map(e => {
        this.postList.push(e);
      })
      console.log(this.postList);
      // console.log(this.postList[0].post);
      // console.log(this.postList[0].post.categories);
    })
  }

  ngOnDestroy() {
  }

}
