import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comments, Like } from '../../interfaces/comments.interface';
import { PostService } from '../../services/post.service';
import { User } from '../../interfaces/user.interface';
import { ValidatorService } from '../../../shared/services/validator.service';
import { CommentService } from '../../services/comment.service';
import { SpinnerService } from '../../../shared/services/spinner.service';

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
  @Output() dateEvent: EventEmitter<Date> = new EventEmitter();
  date: Date = new Date();
  comments: Comments[] = [];
  validationToggle: boolean = false;
  labelButton: string = "Cambiar a Mayuscula";
  currentUser!: User;
  commentId!: string;
  showBtnEdit: boolean = false;
  commentForm!: FormGroup;

  constructor( 
    private commentService: CommentService,
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

  createForm(){
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
        username: this.currentUser.username,
        photoUrl: this.currentUser.photoUrl,
      }
    }
    
    this.commentService.addComment( newComment )
      .subscribe({
        next: _ => {
          this.commentForm.reset({});
          this.spinnerService.hide();
        },
        error: err => {
          console.error(err)
          this.spinnerService.hide();
        }
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
        },
        error: err => {
          this.spinnerService.hide();
          console.error(err)
        }
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
        error: err => {
          this.spinnerService.hide();
          console.error(err)
        }
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
        this.spinnerService.hide()
      }
    })
  }


  sendLike(commentid: string, userid: string, username: string, like: Like[]) {
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
        this.spinnerService.hide()
      }
    })
  }

  haveUserLike( like: Like[] ): boolean {
    const userLike = like.filter( like => like.id === this.currentUser.id )
    return userLike.length !== 0
  }

}
