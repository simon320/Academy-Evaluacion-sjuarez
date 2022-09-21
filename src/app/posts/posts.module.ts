import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { AlternCasePipe } from './pipes/altern-case.pipe';
import { CommentsComponent } from './components/comments/comments.component';
import { PostRoutingModule } from './post-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    CommentsComponent,
    AlternCasePipe
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    PostRoutingModule
  ],
  exports: [
    HomeComponent,
    DetailsComponent
  ]
})
export class PostsModule { }
