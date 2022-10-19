import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { Post } from '../interfaces/post.interface';
import { Comments } from '../interfaces/comments.interface';
import { environment } from '../../../environments/environment';
import { collectionData, Firestore, collection, setDoc, doc, getDoc, updateDoc, DocumentSnapshot, addDoc } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  private herokuPost: string = environment.herokuPost;

  constructor( 
    private http: HttpClient,
    private firestore: Firestore
  ) { }

  addPost( post: Post) {
    const userRef = collection(this.firestore, "posts");
    return from(addDoc( userRef, post ));
  }

  getAllPosts(): Observable<Post[]> {
    const userRef = collection(this.firestore, 'posts');
    return collectionData(userRef, { idField: 'id' }) as Observable<Post[]>;
  }



  getPostById( id: string ): Observable<DocumentSnapshot> {
    const userRef = doc(this.firestore, 'posts', id);
    return from(getDoc( userRef));
  }

  // getPostByI( id: string ): Observable<Post> {
  //   return this.http.get<Post>(`${ this.herokuPost }/posts/${ id }`);
  // }




  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>( `${ this.herokuPost }/posts/` );
  }

  getCommets( id: string ): Observable<Comments[]> {
    return this.http.get<Comments[]>( `${ this.herokuPost }/comments?postId=${ id }` );
  }

  addCommets( comment: Comments ): Observable<Comments> {
    return this.http.post<Comments>( `${ this.herokuPost }/comments?postId=${ comment.postId }`, comment );
  }

  editCommets( comment: Comments ): Observable<Comments> {
    return this.http.put<Comments>( `${ this.herokuPost }/comments/${ comment.id }`, comment );
  }

  deleteCommets( id: number ): Observable<Comments>{
    return this.http.delete<Comments>( `${ this.herokuPost }/comments/${ id }`);
  }

}
