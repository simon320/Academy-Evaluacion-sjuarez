import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { PostRoutingModule } from './post-routing.module';

import { AlternCasePipe } from './pipes/altern-case.pipe';
import { CommentsComponent } from './components/comments/comments.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    AlternCasePipe,
    CommentsComponent,
    DetailsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    PostRoutingModule
  ]
})
export class PostsModule { }
