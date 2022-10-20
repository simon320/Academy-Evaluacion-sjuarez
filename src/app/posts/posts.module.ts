import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';

import { CommentsComponent } from './components/comments/comments.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DatePipe } from './pipes/date.pipe';
import { LikePipe } from './pipes/like.pipe';


@NgModule({
  declarations: [
    DatePipe,
    LikePipe,
    CommentsComponent,
    DetailsComponent,
    HomeComponent,
    CreatePostComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PostsModule { }
