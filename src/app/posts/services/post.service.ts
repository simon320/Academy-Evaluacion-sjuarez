import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { collectionData, Firestore, collection, doc, updateDoc, addDoc, deleteDoc, docSnapshots } from '@angular/fire/firestore';

import { Post } from '../interfaces/post.interface';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( 
    private firestore: Firestore
  ) { }

  addPost( post: Post): Observable<any> {
    const postRef = collection(this.firestore, "posts");
    return from(addDoc( postRef, post ));
  }

  getAllPosts(): Observable<Post[]> {
    const postRef = collection(this.firestore, 'posts');
    return collectionData( postRef, { idField: 'id' }) as Observable<Post[]>;
  }

  getPostById( id: string ): Observable<Post> {
    const postRef = doc(this.firestore, 'posts', id);
    return docSnapshots( postRef ) as unknown as Observable<Post>;
  }

  editPost( uid: string, post: any): Observable<any> {
    const postRef = doc(this.firestore, 'posts', uid );
    return from(updateDoc( postRef, post))
  }

  deletePost( uid: string ): Observable<any> {
    const postRef = doc(this.firestore, 'posts', uid );
    return from(deleteDoc( postRef ))
  }
}
