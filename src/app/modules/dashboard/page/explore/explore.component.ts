import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  

  postList: Array<any> = [];
  lastDoc: any;

  constructor(private post: PostService) { }

  async showMore() {
    console.log(this.lastDoc);
    const response = await this.post.fetchPosts(this.lastDoc)
    this.lastDoc = response.docs[response.docs.length - 1];
    response.forEach((doc) => {
      this.postList.push({...doc.data(), id: doc.id});
    })
  }

  async ngOnInit() {
    const response = await this.post.fetchPosts()
    this.lastDoc = response.docs[response.docs.length - 1];
    response.forEach((doc) => {
      this.postList.push({...doc.data(), id: doc.id});
    })
  }

  ngOnDestroy() {
  }

}
