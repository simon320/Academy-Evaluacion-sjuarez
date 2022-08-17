import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor( private http: HttpClient ) { }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>( this.baseUrl );
  }

  getPostPorId( id: string ): Observable<Post> {
    return this.http.get<Post>(`${ this.baseUrl }/${ id }`);
  }
}
