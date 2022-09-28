import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( 
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
      return this.userService.authentication()
  }

  canLoad(): Observable<boolean> {

      return this.userService.authentication()
        .pipe(
          tap( isAuthenticated => {
            if( !isAuthenticated ) {
              this.router.navigate(['/auth/login'])
            }
          })
        );
  }

}
