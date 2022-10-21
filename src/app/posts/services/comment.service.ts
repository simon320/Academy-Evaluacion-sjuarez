import { Injectable } from '@angular/core';
import { collectionData, Firestore, collection, doc, updateDoc, addDoc, deleteDoc, DocumentSnapshot } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import { Comments } from '../interfaces/comments.interface';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor( private firestore: Firestore ) { }

  addComment( comment: Comments): Observable<any> {
    const commentRef = collection(this.firestore, "comments");
    return from(addDoc( commentRef, comment ));
  }

  editComment( uid: string, comment: object): Observable<any> {
    const commentRef = doc(this.firestore, 'comments', uid );
    return from(updateDoc( commentRef, comment))
  }

  deleteComment( uid: string ): Observable<any> {
    const commentRef = doc(this.firestore, 'comments', uid );
    return from(deleteDoc( commentRef ))
  }

  getAllComments(): Observable<Comments[]> {
    const commentRef = collection(this.firestore, "comments");
    return collectionData( commentRef, { idField: 'id' }) as Observable<Comments[]>;
  }

}