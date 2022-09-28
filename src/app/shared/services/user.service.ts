import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../posts/interfaces/user.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  registerUser( user: User): Observable<User> {
    return this.http.post<User>( `${ this.baseUrl }/users`, user );
  }

  getUserLogin( email: string ): Observable<User[]> {
    return this.http.get<User[]>( `${ this.baseUrl }/users?q=${ email }`);
  }

  getUserById( user: User ): Observable<User> {
    return this.http.put<User>( `${ this.baseUrl }/users/${ user.id }`, user);
  }

  authentication(): Observable<boolean> {
    if( !localStorage.getItem('currentUser') ) {
      return of(false);
    } else {
      return of(true);
    }
  }

}
