import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../posts/interfaces/user.interface';
import { from, Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import { collectionData, Firestore, collection, setDoc, doc, getDoc, updateDoc, DocumentSnapshot } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private herokuPost: string = environment.herokuPost;

  constructor( 
    private http: HttpClient,
    private auth: AngularFireAuth,
    private firestore: Firestore
  ) {}

  register( email: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword( email, password );
  }

  login( email: string, password: string ) {
    return from(this.auth.signInWithEmailAndPassword( email, password ));
  }

  logout() {
    return this.auth.signOut();
  }

  addUser( uid: string, user: any) {
    const userRef = doc(this.firestore, "users", uid);
    return setDoc( userRef, user);
  }

  getAuthUser() {
    return this.auth.authState;
  }

  getUserById( uid: string ): Observable<DocumentSnapshot>{
    const userRef = doc(this.firestore, 'users', uid );
    return from(getDoc(userRef));
  }

  editUser( uid: string, user: any) {
    const userRef = doc(this.firestore, 'users', uid );
    return from(updateDoc( userRef, user))
  }



  
  getAllUser(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }




  ////////////////////////////////////////////////////////////
  registerUser( user: User): Observable<User> {
    return this.http.post<User>( `${ this.herokuPost }/users`, user );
  }

  getUserLogin( email: string, pass: string ): Observable<User[]> {
    return this.http.get<User[]>( `${ this.herokuPost }/users?email=${ email }&password=${ pass }`);
  }

  getUserByEmail( email: string ): Observable<User[]> {
    return this.http.get<User[]>( `${ this.herokuPost }/users?email=${ email }`);
  }

}
