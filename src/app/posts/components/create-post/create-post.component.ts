import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timer } from 'rxjs';

import { ErrorService } from '../../../shared/services/error.service';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { User } from '../../../user/interfaces/user.interface';
import { UserService } from 'src/app/user/services/user.service';
import { ValidatorService } from '../../../shared/services/validator.service';
import { SpinnerService } from '../../../shared/services/spinner.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styles: ['']
})
export class CreatePostComponent implements OnInit {
  
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
  date: Date = new Date();
  currentUser!: User;
  postId!: number;
  commentId!: number;
  showBtnEdit: boolean = false;
  postForm!: FormGroup;
  timer$ = timer(2500);

  constructor( 
    private postService: PostService,
    private spinnerService: SpinnerService,
    private errorService: ErrorService,
    private userService: UserService,
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

  createForm(): void{
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

  savePost(): void{
    if(this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.spinnerService.show();
    const newPost: Post = {
      title: this.postForm.get('title')?.value,
      body: this.postForm.get('body')?.value,
      author: {
        id: this.currentUser.id
      },
      date: this.date,
      comments: [],
      hide: false,
      blockComments: false   
    }

    const amountPost = {
      amountPost: this.currentUser.amountPost + 1
    } 

    this.postService.addPost(newPost)
      .subscribe({
        next: _ => {
          this.postForm.reset({});
          this.close();
          this.increseAmountPost( this.currentUser.id, amountPost )
        },
        error: _ => {
          this.spinnerService.hide();
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
      })
  }

  increseAmountPost( id: string, amoutPost: object): void {
    this.userService.editUser( id, amoutPost )
      .subscribe({
        next: _ => {
          this.spinnerService.hide();
        },
        error: _ => {
          this.spinnerService.hide();
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
      })
  }

  close() {
    if( this.postForm.touched ){
      if( !confirm('¿Deseas cerrar el formulario? Perderas lo escrito hasta el momento!') ){
        return;
      }
    }
      
    this.postForm.reset({})
    this.closeEvent.emit(false)
  }
  
}
