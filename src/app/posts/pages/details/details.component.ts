import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { PostService } from '../../services/post.service';

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
  postDetails!: any;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.postService.getPostById( id ) )
    )
    .subscribe({
      next: resp => this.postDetails = resp.data(),
      error: _ => this.router.navigate(['error'])
    });
  }

  showDate( date: Date): void {
    this.date = date;
  }
}