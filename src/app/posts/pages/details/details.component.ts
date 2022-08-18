import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  date: Date = new Date();
  postDetails: Post = {};
  showDate: boolean = false;


  constructor( private activatedRoute: ActivatedRoute,
               private postService: PostService) { };


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.postService.getPostForId( id ) )
      )
      .subscribe( post => this.postDetails = post );
    }
 

    emitDate() {
      this.showDate = !this.showDate;
      return this.showDate;
    }
}
