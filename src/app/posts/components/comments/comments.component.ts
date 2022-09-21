import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs';

import { Comments } from '../../interfaces/comments.interface';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styles: [`
    p-panel{
      margin: 2rem;
    }
  `]
})
export class CommentsComponent implements OnInit {

  @Input() postDetails!: Post;

  date: Date = new Date();
  comments: Comments[] = [];
  showDate: boolean = false;
  validationToggle: boolean = false;
  labelButton: string = "Cambiar a Mayuscula";

  @Output() dateEvent = new EventEmitter<boolean>();

  constructor( private postService: PostService,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.postService.getCommets( id ) )
      )
      .subscribe( resp => this.comments = resp )
  }

  emitDate() {
    this.dateEvent.emit(this.showDate)
  }

  toggleCase() {
    this.validationToggle = !this.validationToggle;
    if (this.labelButton === "Cambiar a Mayuscula" ){
      this.labelButton = "Cambiar a Minuscula";
    } else {
      this.labelButton = "Cambiar a Mayuscula"
    }
  }

}
