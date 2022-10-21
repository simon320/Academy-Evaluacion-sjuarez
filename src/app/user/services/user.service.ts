import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Firestore, DocumentSnapshot, setDoc, doc, getDoc, updateDoc, docSnapshots } from '@angular/fire/firestore';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( 
    private auth: AngularFireAuth,
    private firestore: Firestore
  ) {}

  register( email: string, password: string ) {
    return from(this.auth.createUserWithEmailAndPassword( email, password ));
  }

  login( email: string, password: string ) {
    return from(this.auth.signInWithEmailAndPassword( email, password ));
  }

  logout() {
    return from(this.auth.signOut());
  }

  addUser( uid: string, user: any) {
    const userRef = doc(this.firestore, "users", uid);
    return from(setDoc( userRef, user));
  }

  getAuthUser() {
    return this.auth.authState;
  }

  getUserById( uid: string ): Observable<User> {
    const userRef = doc(this.firestore, 'users', uid );
    return docSnapshots( userRef ) as unknown as Observable<User>;
  }

  editUser( uid: string, user: object ) {
    const userRef = doc(this.firestore, 'users', uid );
    return from(updateDoc( userRef, user))
  }

}
