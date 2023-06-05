import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  currentUserData?: any;
  favouritePosts: Array<any> = [];
  
  fetchedFavouritePosts: Array<any> = [];

  whichPostToFetch: number = 0;

  currentUserId?: string;

  constructor(private authService: AuthService, private userService: UserService,
    private postService: PostService) { }

  async ngOnInit() {

    const response = await this.authService.getUser();

    response.subscribe((user) => {

      this.currentUserId = user?.uid;

      this.userService.getCurrentUserData(user!.uid)
      .then((user) => {
        this.currentUserData = user.data();
        this.favouritePosts = this.currentUserData.favouritePosts;

        if (this.favouritePosts.length > 0) {
          this.postService.getFavouritePosts(this.favouritePosts, this.whichPostToFetch)
          .then((post) => {
            this.fetchedFavouritePosts.push({...post.data(), id: post.id});
            this.whichPostToFetch += 1;
          })
        }
      })
    })
  }

  fetchMoreFavouritePosts() {
    if(this.favouritePosts.length == this.fetchedFavouritePosts.length) {
      return
    }
    this.postService.getFavouritePosts(this.favouritePosts, this.whichPostToFetch)
      .then((post) => {
        this.fetchedFavouritePosts.push({...post.data(), id: post.id});
        this.whichPostToFetch += 1;
      })
  }

}
