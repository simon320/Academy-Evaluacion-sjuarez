import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { UserService } from '../../../shared/services/user.service';



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

  constructor( 
    private userService: UserService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getAllPost();
    // this.getUid();
  }

  // getUid() {
  //   this.uid = localStorage.getItem('uid')!
  // }

  
  // async getCurrentUser() {
  //   const docSnap = await this.userService.getUserById(this.uid)
  //   this.currentUser = docSnap.data();
  //   localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
  // }

  getAllPost(): void {
    this.postService.getPosts()
    .subscribe( post => this.post = post );
  }

}
