import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { SpinnerService } from '../../../shared/services/spinner.service';


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
  userEdit: boolean = false;
  newPost: boolean = false;

  constructor( 
    private postService: PostService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllPosts()
  }

  showCreatePost( boolean: boolean ) {
    this.newPost = boolean;
  }

  getAllPosts(): void {
    this.spinnerService.show()
    this.postService.getAllPosts()
    .subscribe({
      next: post => {
        this.post = post
        console.log(this.post);
        this.spinnerService.hide()
      },
      error: err => {
        this.spinnerService.hide()
        console.error(err)
      }
    });
  }

}
