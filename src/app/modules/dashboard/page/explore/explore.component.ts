import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  
  customSearch: boolean = false;
  postList: Array<any> = [];
  searchList: Array<any> = [];
  lastDoc: any;

  continueFetching?: boolean = true;

  constructor(private post: PostService) { }

  async searchPost(searchText: string) {
    const response = await this.post.searchPost(searchText)

    response.forEach((doc) => {
      this.searchList.pop();
      this.searchList.push({...doc.data(), id: doc.id});
    })

    this.customSearch = true;
  }

  async showMore() {
    if (this.continueFetching) {
      console.log(this.lastDoc);
      const response = await this.post.fetchPosts(this.lastDoc)
      if (response.empty) {
        this.continueFetching = false;
      }
      this.lastDoc = response.docs[response.docs.length - 1];
      response.forEach((doc) => {
        this.postList.push({...doc.data(), id: doc.id});
      })
    } else {
      console.log("no more documents");
    }
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
