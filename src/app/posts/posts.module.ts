import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { AppRoutingModule } from '../app-routing.module';
import { AlternCasePipe } from './pipes/altern-case.pipe';
import { CommetsComponent } from './components/comments/commets.component';


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
    AppRoutingModule
  ],
  exports: [
    HomeComponent,
    DetailsComponent
  ]
})
export class PostsModule { }
