import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private router: Router ) {}

  isAuthenticated = localStorage.getItem('uid');

  canActivate(): boolean {
    return this.authenticated()
  }

  canLoad(): boolean {
    return this.authenticated()
  }

  authenticated(): boolean {
      if ( this.isAuthenticated ) {
        return true;
      }

      this.router.navigate(['/auth/login']);
      return false;
  }
  
}