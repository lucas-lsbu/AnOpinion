import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  
  postList: Array<any> = [];
  lastDoc?: DocumentData;
  currentUserId!: string;

  continueFetching?: boolean = true;

  constructor(private postService: PostService, private authService: AuthService) {}

  async showMore() {
    if (this.continueFetching) {
      const response = await this.postService.fetchPostsByUser(this.currentUserId, this.lastDoc)
      this.lastDoc = response.docs[response.docs.length - 1];
      if (response.empty) {
        this.continueFetching = false;
      }
      response.forEach((doc) => {
        console.log("this just fetched a new document!");
        console.log(doc.data())
        this.postList.push({...doc.data(), id: doc.id});
      })
    } else {
      console.log("ran out of documents my g");
    }
  }

  async ngOnInit() {
    (await this.authService.getUser()).subscribe(async (user) => {
      const response = await this.postService.fetchPostsByUser(user!.uid)
      this.currentUserId = user!.uid;
      this.lastDoc = response.docs[response.docs.length - 1];
      response.forEach((doc) => {
        this.postList.push({...doc.data(), id: doc.id});
      })
    })
  }

}
