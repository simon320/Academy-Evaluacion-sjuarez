import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './posts/pages/details/details.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HomeComponent } from './posts/pages/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'post',
    pathMatch: 'full'
  },
  {
    path: 'post',
    component: HomeComponent,
  },
  {
    path: 'post/:id',
    component: DetailsComponent
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]


@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
