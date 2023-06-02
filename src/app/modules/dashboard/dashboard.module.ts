import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './page/home/home.component';
import { MyPostsComponent } from './page/my-posts/my-posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsComponent } from './page/settings/settings.component';
import { FavouritesComponent } from './page/favourites/favourites.component';
import { ViewPostComponent } from './page/view-post/view-post.component';
import { CreatePostComponent } from './page/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    MyPostsComponent,
    SettingsComponent,
    FavouritesComponent,
    ViewPostComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
