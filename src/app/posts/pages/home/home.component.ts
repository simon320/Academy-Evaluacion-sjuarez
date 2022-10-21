import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { User } from '../../../user/interfaces/user.interface';
import { UserService } from '../../../user/services/user.service';
import { ErrorService } from '../../../shared/services/error.service';


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
  authorPost!: User;
  authorId!: string[];
  posts: Post[] = [];
  momentPosts: Post[] = [];
  showPosts: Post[] = [];
  userEdit: boolean = false;
  newPost: boolean = false;
  timer$ = timer(2500);

  constructor( 
    private postService: PostService,
    private userService: UserService,
    private spinnerService: SpinnerService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.getAllPosts()
    this.getCurrentUser()
    this.getAuthor()
  }

  getCurrentUser(): void {
    if(!localStorage.getItem('currentUser')){
      return    
    }
    this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
  }

  showCreatePost( boolean: boolean ): void {
    this.newPost = boolean;
  }

  getAllPosts(): void {
    this.spinnerService.show()
    this.postService.getAllPosts()
      .subscribe({
        next: post => {         
          this.posts = post
          this.getAuthor()
          this.setShowPost()
          this.spinnerService.hide()
        },
        error: _ => {
          this.spinnerService.hide();
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
      });
  }

  getAuthor(): void {
    this.posts.forEach( post => {
      this.userService.getUserById( post.author?.id! ).subscribe(
        author => post.author = author.data!()
      )
    })
  }

  setShowPost(): Post[] {
    if(this.currentUser.rol === 'admin') {
      this.showPosts = this.posts
      return this.showPosts
    }

    this.showPosts = this.posts.filter( post => (post.author?.id === this.currentUser.id || !post.hide))
    return this.showPosts
  }
}