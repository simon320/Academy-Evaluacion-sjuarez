import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( 
    private router: Router
  ) {}

  canActivate(): boolean {
    if( !localStorage.getItem('currentUser') ) {
      return false;
    }

    return true;
  }

  canLoad(): boolean {
    if( !localStorage.getItem('currentUser') ) {
      this.router.navigate(['/auth/login'])
    }

    return true;
  }
  
}
