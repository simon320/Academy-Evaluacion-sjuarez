import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../posts/interfaces/user.interface';
import { Observable, Subject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import { collectionData, Firestore, collection, addDoc, setDoc, doc, getDoc } from '@angular/fire/firestore'

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
    return this.auth.signInWithEmailAndPassword( email, password );
  }

  logout() {
    return this.auth.signOut();
  }

  addUser( uid: string, user: any) {
    const userRef = doc(this.firestore, "user", uid);
    return setDoc( userRef, user);
  }

  getAllUser(): Observable<User[]> {
    const userRef = collection(this.firestore, 'user');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  getAuthUser() {
    return this.auth.authState;
  }

  // async getUserById( uid: string ){
  //   const userRef = doc(this.firestore, 'user', 'L1RVCLxRAvd2UFuofQU4sHiZeWh2' );
  //   return await getDoc(userRef);
  // }

  getUserById( uid: string ){
    const userRef = doc(this.firestore, 'user', uid );
    return getDoc(userRef);
  }

  // addUser( user: any) {
  //   const userRef = collection(this.firestore, 'user');
  //   return addDoc((userRef), user);
  // }

  // getAllUser() {
  //   const coll = collection(this.firestore, 'user');
  //   this.user$ = collectionData(coll);
  // }


  registerUser( user: User): Observable<User> {
    return this.http.post<User>( `${ this.herokuPost }/users`, user );
  }

  getUserLogin( email: string, pass: string ): Observable<User[]> {
    return this.http.get<User[]>( `${ this.herokuPost }/users?email=${ email }&password=${ pass }`);
  }

  getUserByEmail( email: string ): Observable<User[]> {
    return this.http.get<User[]>( `${ this.herokuPost }/users?email=${ email }`);
  }

  // getUserById( user: User ): Observable<User> {
  //   return this.http.put<User>( `${ this.herokuPost }/users/${ user.id }`, user);
  // }

}
