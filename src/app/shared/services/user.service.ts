import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../posts/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private herokuPost: string = environment.herokuPost;

  constructor( private http: HttpClient ) { }

  registerUser( user: User): Observable<User> {
    return this.http.post<User>( `${ this.herokuPost }/users`, user );
  }

  getUserLogin( email: string, pass: string ): Observable<User[]> {
    return this.http.get<User[]>( `${ this.herokuPost }/users?email=${ email }&password=${ pass }`);
  }

  getUserByEmail( email: string ): Observable<User[]> {
    return this.http.get<User[]>( `${ this.herokuPost }/users?email=${ email }`);
  }

  getUserById( user: User ): Observable<User> {
    return this.http.put<User>( `${ this.herokuPost }/users/${ user.id }`, user);
  }

}
