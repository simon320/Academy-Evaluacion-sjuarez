import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Comments } from '../../interfaces/comments.interface';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { ValidatorService } from '../../../shared/services/validator.service';
import { tap, switchMap } from 'rxjs';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  
    @Output() dateEvent: EventEmitter<Date> = new EventEmitter();
    @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
    date: Date = new Date();
    comments: Comments[] = [];
    validationToggle: boolean = false;
    currentUser!: User;
    postId!: number;
    commentId!: number;
    showBtnEdit: boolean = false;
    postForm!: FormGroup;
  
    constructor( 
      private postService: PostService,
      private activatedRoute: ActivatedRoute,
      private fb: FormBuilder,
      private vs: ValidatorService
    ) { this.createForm() }
  
    ngOnInit(): void {
      this.getCurrentUser();
    }
  
    get titleErrorMsg(): string {
      const errors = this.postForm.get('title')?.errors;
      if( errors?.['required'] ) {
        return 'El nombre del comentario es obligatorio.'
      } else if( errors?.['maxlength'] ) {
        return 'El titulo no debe exceder los 100 caracteres.'
      } else if( errors?.['empty'] ) {
        return 'El titulo no puede quedar en blanco.'
      }
      return '';
    }
  
    get bodyErrorMsg(): string {
      const errors = this.postForm.get('body')?.errors;
      if( errors?.['required'] ) {
        return 'El contenido del post es obligatorio.'
      } else if( errors?.['maxlength'] ) {
        return 'El contenido no debe exceder los 500 caracteres.'
      } else if( errors?.['empty'] ) {
        return 'El contenido del post no puede quedar en blanco.'
      }
      return '';
    }
  
    createForm(){
      this.postForm = this.fb.group({
        title: ['', [ Validators.required, Validators.maxLength(100) ]],
        body: ['', [ Validators.required, Validators.maxLength(500)]],
      }, {
        validators: [ this.vs.empty('name'), this.vs.empty('body')]
      })
    }
  
    inputInvalid( input: string ): boolean | undefined {
      return this.postForm.get(input)?.invalid
                && this.postForm.get(input)?.touched;
    }
  
    getCurrentUser(): void {
      if(!localStorage.getItem('currentUser')){
        return    
      }
  
      this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
    }
  
    // getComments(): void {
    //   this.activatedRoute.params
    //   .pipe(
    //     tap( ({ id }) => this.postId = id ),
    //     switchMap( ({ id }) => this.postService.getCommets( id ) )
    //   )
    //   .subscribe({
    //     next: comment => this.comments = comment,
    //     error: err => console.error(err)
    //   });
    // }
  
    // emitDate(): void {
    //   this.dateEvent.emit(this.date)
    // }
  
    savePost(): void{
      if(this.postForm.invalid) {
        this.postForm.markAllAsTouched();
        return;
      }
  
      const newPost: Post = {
        title: this.postForm.get('title')?.value,
        body: this.postForm.get('body')?.value,
        author: {
          id: this.currentUser.id,
          username: this.currentUser.username,
          photoUrl: this.currentUser.photoUrl
        },
        date: this.date,
        comments: null,
        hide: false    
      }

      this.postService.addPost(newPost)
        .subscribe({
          next: _ => {
            this.postForm.reset({});
            this.close();
          },
          error: err => console.error(err)
        })
    }






    //   this.postService.addCommets( newPost )
  
    // openEditComment( id: number, name: string, body: string ): void {
    //   this.commentId = id;
    //   this.postForm.reset({
    //     name: name,
    //     body: body,
    //   })
    //   this.showBtnEdit = true;
    // }
  
    // editComment(): void {
    //   if(this.postForm.invalid) {
    //     this.postForm.markAllAsTouched();
    //     return;
    //   }
  
    //   const editComment: Comments = {
    //     postId: this.postId,
    //     id: this.commentId,
    //     name: this.postForm.get('name')?.value,
    //     email: this.currentUser.email,
    //     body: this.postForm.get('body')?.value,
    //   }
  
    //   this.postService.editCommets( editComment )
    //     .subscribe({
    //       next: _ => {
    //         this.postForm.reset({});
    //         // this.emitDate();
    //         // this.getComments();
    //       },
    //       error: err => console.error(err)
    //     })
    // }
  
    // deleteComment( id: number): void {
    //   if( !confirm('¿Desea eliminar el comentario?') ){
    //     return;
    //   }
    //     this.postService.deleteCommets( id )
    //     .subscribe({
    //       next: _ => {
    //         // this.getComments();
    //       },
    //       error: err => console.error(err)
    //     });
    // }

    close() {
      this.closeEvent.emit(false)
    }
  
  
}
