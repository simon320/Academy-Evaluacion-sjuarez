import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ToPersistGuard implements CanActivate {

  constructor( 
    private router: Router
  ) {}

  canActivate(): boolean {
    if( localStorage.getItem('uid') ) {
      this.router.navigate(['/post'])
    }

    return true;
  }
  
}