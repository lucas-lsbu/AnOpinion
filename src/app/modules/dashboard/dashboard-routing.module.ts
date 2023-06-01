import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MyPostsComponent } from './page/my-posts/my-posts.component';
import { ViewPostComponent } from './page/view-post/view-post.component';
import { SettingsComponent } from './page/settings/settings.component';
import { FavouritesComponent } from './page/favourites/favourites.component';
import { CreatePostComponent } from './page/create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'my-posts',
    component: MyPostsComponent
  },
  {
    path: 'post/id',
    component: ViewPostComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  },
  {
    path: 'create-post',
    component: CreatePostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
