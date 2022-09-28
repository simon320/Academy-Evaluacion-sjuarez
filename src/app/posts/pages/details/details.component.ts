import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [`
    h4 {
      color: #d3d3d3;
    }
  `]
})
export class DetailsComponent implements OnInit {

  date!: Date;
  postDetails: Post = {
    id: 0,
    userId: 0,
    title: "",
    body: ""
  }

  constructor( 
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { };


  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.postService.getPostForId( id ) )
    )
    .subscribe({
      next: post => this.postDetails = post,
      error: _ => this.router.navigate(['error'])
    });
  }

  showDate( date: Date): void {
    this.date = date;
  }
}