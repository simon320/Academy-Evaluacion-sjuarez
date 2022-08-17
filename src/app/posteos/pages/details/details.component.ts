import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [
  ]
})
export class DetailsComponent implements OnInit {

  postDetails: Post = {}


  constructor( private activatedRoute: ActivatedRoute,
               private postService: PostService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.postService.getPostPorId( id ) )
      )
      .subscribe( post => this.postDetails = post )
    }


}
