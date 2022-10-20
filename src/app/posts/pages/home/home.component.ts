import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { User } from '../../interfaces/user.interface';


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

  currentUser!: User;
  post: Post[] = []
  showPost: Post[] = []
  userEdit: boolean = false;
  newPost: boolean = false;

  constructor( 
    private postService: PostService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllPosts()
    this.getCurrentUser()
  }

  getCurrentUser(): void {
    if(!localStorage.getItem('currentUser')){
      return    
    }
    this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
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
        this.setShowPost()
        this.spinnerService.hide()
      },
      error: err => {
        this.spinnerService.hide()
        console.error(err)
      }
    });
  }

  setShowPost(): Post[] {
    if(this.currentUser.rol === 'admin') {
      this.showPost = this.post
      return this.showPost
    }

    this.showPost = this.post.filter( post => (post.author?.id === this.currentUser.id || !post.hide))
    return this.showPost
  }
}
