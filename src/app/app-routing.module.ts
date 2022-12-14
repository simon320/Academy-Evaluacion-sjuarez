import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';
import { ToPersistGuard } from './guards/to-persist.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    canActivate: [ ToPersistGuard ]
  },
  {
    path: 'post',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsModule),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ],
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