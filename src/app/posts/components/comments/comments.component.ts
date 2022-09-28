import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

import { Comments } from '../../interfaces/comments.interface';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { User } from '../../interfaces/user.interface';
import { ValidatorService } from '../../../shared/services/validator.service';

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
  currentUser!: User;
  postId!: number;

  @Output() dateEvent: EventEmitter<Date> = new EventEmitter();

  commentForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required ]],
    body: ['', [ Validators.required, Validators.maxLength(200)]],
  }, {
    validators: [ this.vs.empty('name'), this.vs.empty('body')]
  })

  get nameErrorMsg(): string {
    const errors = this.commentForm.get('name')?.errors;
    if( errors?.['required'] ) {
      return 'El nombre del comentario es obligatorio.'
    } else if( errors?.['empty'] ) {
      return 'El titulo no puede quedar en blanco.'
    }
    return '';
  }

  get bodyErrorMsg(): string {
    const errors = this.commentForm.get('body')?.errors;
    if( errors?.['required'] ) {
      return 'El contenido del comentario es obligatorio.'
    } else if( errors?.['maxlength'] ) {
      return 'El contenido no debe exceder los 200 caracteres.'
    } else if( errors?.['empty'] ) {
      return 'El contenido no puede quedar en blanco.'
    }
    return '';
  }

  constructor( 
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private vs: ValidatorService
  ) { }

  ngOnInit(): void {
    this.getComments();
    this.getCurrentUser();
  }

  inputInvalid( input: string ): boolean | undefined {
    return this.commentForm.get(input)?.invalid
              && this.commentForm.get(input)?.touched;
  }

  getCurrentUser(): void {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
  }

  getComments(): void {
    this.activatedRoute.params
    .pipe(
      tap( ({ id }) => this.postId = id ),
      switchMap( ({ id }) => this.postService.getCommets( id ) )
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

  saveComment(): void{
    if(this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    const newComment: Comments = {
      postId: this.postId,
      name: this.commentForm.get('name')?.value,
      email: this.currentUser.email,
      body: this.commentForm.get('body')?.value,
    }

    this.postService.addCommets( newComment )
      .subscribe({
        next: _ => {
          this.commentForm.reset({}),
          this.emitDate()
        },
        error: err => console.log(err)
      })
  }

}
