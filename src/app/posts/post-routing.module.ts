import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {
    path: 'post',
    children: [
      { path: ':id', component: DetailsComponent },
      { path: '**', redirectTo: 'post' },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class PostRoutingModule { }
