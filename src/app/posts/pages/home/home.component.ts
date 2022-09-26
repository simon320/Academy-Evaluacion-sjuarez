import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    a {
      text-decoration: none;
      color: #acf;
    }
  `]
})
export class HomeComponent implements OnInit {

  post: Post[] = []

  constructor( private postService: PostService) { }

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost(): void {
    this.postService.getPost()
    .subscribe( post => this.post = post );
  }

  showDetails( id: string): void {
    this.postService.getPostForId(id)
  }

}
