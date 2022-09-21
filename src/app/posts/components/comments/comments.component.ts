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
  validationToggle: boolean = false;
  labelButton: string = "Cambiar a Mayuscula";

  @Output() dateEvent: EventEmitter<Date> = new EventEmitter();

  constructor( 
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.postService.getCommets( id ) )
    )
    .subscribe({
      next: comment => this.comments = comment,
      error: err => console.log(err)
    });
  }

  emitDate(): void {
    this.dateEvent.emit(this.date)
  }

  toggleCase(): void {
    this.validationToggle = !this.validationToggle;
    if (this.labelButton === "Cambiar a Mayuscula" ){
      this.labelButton = "Cambiar a Minuscula";
    } else {
      this.labelButton = "Cambiar a Mayuscula"
    }
  }

}
