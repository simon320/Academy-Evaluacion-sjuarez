import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { PostRoutingModule } from './post-routing.module';

import { AlternCasePipe } from './pipes/altern-case.pipe';
import { CommentsComponent } from './components/comments/comments.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    PostRoutingModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
