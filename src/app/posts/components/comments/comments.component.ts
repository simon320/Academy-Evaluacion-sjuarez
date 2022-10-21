import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

import { Comments, Like } from '../../interfaces/comments.interface';
import { CommentService } from '../../services/comment.service';
import { ErrorService } from '../../../shared/services/error.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { User } from '../../../user/interfaces/user.interface';
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
  
  @Input() commentsForAdmin!: Comments[];
  @Input() commentsForUser!: Comments[];
  @Input() showCommentForm!: boolean;
  @Input() postId!: string;
  date: Date = new Date();
  currentUser!: User;
  commentId!: string;
  showBtnEdit: boolean = false;
  commentForm!: FormGroup;
  timer$ = timer(2500);

  constructor( 
    private commentService: CommentService,
    private errorService: ErrorService,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private vs: ValidatorService
  ) { this.createForm() }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  get titleErrorMsg(): string {
    const errors = this.commentForm.get('title')?.errors;
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

  createForm(): void{
    this.commentForm = this.fb.group({
      title: ['', [ Validators.required ]],
      body: ['', [ Validators.required, Validators.maxLength(200)]],
    }, {
      validators: [ this.vs.empty('name'), this.vs.empty('body')]
    })
  }

  inputInvalid( input: string ): boolean | undefined {
    return this.commentForm.get(input)?.invalid
              && this.commentForm.get(input)?.touched;
  }

  getCurrentUser(): void {
    if(!localStorage.getItem('currentUser')){
      return    
    }
    this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
  }

  saveComment(): void{
    if(this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.spinnerService.show();
    const newComment: Comments = {
      postId: this.postId,
      title: this.commentForm.get('title')?.value,
      body: this.commentForm.get('body')?.value,
      date: this.date,
      like: [],
      hide: false,
      author: {
        id: this.currentUser.id,
      }
    }
    
    this.commentService.addComment( newComment )
      .subscribe({
        next: _ => {
          this.commentForm.reset({});
          this.spinnerService.hide();
        },
        error: _ => {
          this.spinnerService.hide();
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
      })
  }

  openEditComment( id: string, title: string, body: string ): void {
    this.commentId = id;
    this.commentForm.reset({
      title: title,
      body: body,
    })
    this.showBtnEdit = true;
  }

  editComment(): void {
    if(this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.spinnerService.show();
    const editComment = {
      title: this.commentForm.get('title')?.value,
      body: this.commentForm.get('body')?.value,
      date: this.date
    }

    this.commentService.editComment( this.commentId, editComment )
      .subscribe({
        next: _ => {
          this.commentForm.reset({});
          this.spinnerService.hide();
          this.showBtnEdit = false;
        },
        error: _ => {
          this.spinnerService.hide();
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
      })
  }

  deleteComment( id: string): void {
    if( !confirm('¿Desea eliminar el comentario?') ){
      return;
    }

    this.spinnerService.show();
    this.commentService.deleteComment( id )
      .subscribe({
        next: _ => {
          this.spinnerService.hide();
        },
        error: _ => {
          this.spinnerService.hide();
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
      });
  }

  hideComment( id: string, hide: boolean ): void {
    this.commentId = id;
    if(hide) {
      if( !confirm('¿Desea ocultar el comentario?') ){
        return;
      }
      
      this.spinnerService.show()
      const visible = {
        hide: true
      }
      
      this.getComment( visible )
    } else {
      if( !confirm('¿Desea volver visible el comentario?') ){
        return;
      }
      
      this.spinnerService.show()
      const visible = {
        hide: false
      }
      
      this.getComment( visible )
    }
  }

  getComment( visible: object ): void {
    this.commentService.editComment( this.commentId, visible )
    .subscribe({
      next: _ => {
        this.spinnerService.hide()
      },
	    error: _ => {
        this.spinnerService.hide();
        this.errorService.show();
        this.timer$.subscribe( _ => this.errorService.hide())
      },
    })
  }


  sendLike(commentid: string, userid: string, username: string, like: Like[]): void {
    this.spinnerService.show()
    const newLike = {
          id: userid,
          username
        }
    
    like.push(newLike)
    const sendLike = { like }
    this.commentService.editComment( commentid, sendLike )
    .subscribe({
      next: _ => {
        this.spinnerService.hide()
      },
	    error: _ => {
        this.spinnerService.hide();
        this.errorService.show();
        this.timer$.subscribe( _ => this.errorService.hide())
      },
    })
  }

  haveUserLike( like: Like[] ): boolean {
    const userLike = like.filter( like => like.id === this.currentUser.id )
    return userLike.length !== 0
  }

}
