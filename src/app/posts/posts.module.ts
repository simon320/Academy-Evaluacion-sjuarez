import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { AlternCasePipe } from './pipes/altern-case.pipe';
import { CommetsComponent } from './components/comments/commets.component';
import { PostRoutingModule } from './post-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    CommetsComponent,
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
