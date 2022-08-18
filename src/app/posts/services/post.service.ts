import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../interfaces/post.interface';
import { Commets } from '../interfaces/commets.interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor( private http: HttpClient ) { }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>( `${ this.baseUrl }/posts/` );
  }

  getPostForId( id: string ): Observable<Post> {
    return this.http.get<Post>(`${ this.baseUrl }/posts/${ id }`);
  }

  getCommets( id: string ) {
    return this.http.get<Commets[]>( `${ this.baseUrl }/comments?postId=${ id }` );
  }
}
