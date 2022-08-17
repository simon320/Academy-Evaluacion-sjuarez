import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { Comentarios } from '../interfaces/comentarios.interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor( private http: HttpClient ) { }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>( `${ this.baseUrl }/posts/` );
  }

  getPostPorId( id: string ): Observable<Post> {
    return this.http.get<Post>(`${ this.baseUrl }/posts/${ id }`);
  }

  getComentarios( id: string ) {
    return this.http.get<Comentarios[]>( `${ this.baseUrl }/comments?postId=${ id }` );
  }
}
