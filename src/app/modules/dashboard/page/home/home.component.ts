import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  createdPosts: Array<any> = [];

  constructor(private post: PostService, private auth: AuthService) {

  }

  async ngOnInit() {
    (await this.auth.getUser()).subscribe(async (user) => {
      const response = await this.post.fetchPostsByUser(user!.uid);

      response.forEach((doc) => {
        this.createdPosts.push({...doc.data(), id: doc.id});
      })

      console.log(this.createdPosts);
    
    })
  }

  ngOnDestroy() {

  }

}
