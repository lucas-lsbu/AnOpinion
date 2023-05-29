import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MyPostsComponent } from './page/my-posts/my-posts.component';
import { ViewPostComponent } from './page/view-post/view-post.component';
import { SettingsComponent } from './page/settings/settings.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
