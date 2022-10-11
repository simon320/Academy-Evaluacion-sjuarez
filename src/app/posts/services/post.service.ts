import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../interfaces/post.interface';
import { Comments } from '../interfaces/comments.interface';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private herokuPost: string = environment.herokuPost;

  constructor( private http: HttpClient ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>( `${ this.herokuPost }/posts/` );
  }

  getPostById( id: string ): Observable<Post> {
    return this.http.get<Post>(`${ this.herokuPost }/posts/${ id }`);
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
