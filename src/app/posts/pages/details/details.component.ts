import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { PostService } from '../../services/post.service';
import { User } from '../../interfaces/user.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';
import { SpinnerService } from '../../../shared/services/spinner.service';

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
  currentUser!: User;
  postForm!: FormGroup;
  showEditPost: boolean = false;
  postId!: string;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private vs: ValidatorService,
    private router: Router
    ) { this.createForm() }

  ngOnInit(): void {
    this.getPostById();
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    if(!localStorage.getItem('currentUser')){
      return    
    }

    this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
  }

  getPostById(): void {
    this.activatedRoute.params
    .pipe(
      tap( ({id}) => this.postId = id ),
      switchMap( ({id}) => this.postService.getPostById( id ))
    )
    .subscribe({
      next: resp => this.postDetails = resp.data(),
      error: _ => this.router.navigate(['error'])
    });
  }

  showDate( date: Date): void {
    this.date = date;
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

  openEditPost(): void {
    this.postForm.reset({
      title: this.postDetails.title,
      body: this.postDetails.body,
    })
    this.showEditPost = true;
  }

  refreshPost() {
    this.postService.getPostById( this.postId )
      .subscribe({
        next: resp => this.postDetails = resp.data(),
        error: err => console.error(err)
      })
  }

  editPost(): void {
    if(this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.spinnerService.show()
    const editPost = {
      title: this.postForm.get('title')?.value,
      body: this.postForm.get('body')?.value,
    }

    this.postService.editPost( this.postId, editPost )
      .subscribe({
        next: _ => {
          this.postForm.reset({});
          this.refreshPost();
          this.showEditPost = false;
          this.spinnerService.hide()
        },
        error: _ => {
          this.spinnerService.hide()
        }
      })
  }

  deletePost(): void {
    if( !confirm('¿Desea eliminar el Post?') ){
      return;
    }

    this.spinnerService.show()
    this.postService.deletePost( this.postId )
      .subscribe({
        next: _ => {
          this.router.navigate(['/post'])
          this.spinnerService.hide()
        },
        error: _ => {
          this.spinnerService.hide()
        }
      });
  }

  hidePost( hide: boolean ): void {
    if(hide) {
      if( !confirm('¿Desea ocultar el Post a los demas?') ){
        return;
      }
      
      this.spinnerService.show()
      const visiblePost = {
        hide: true
      }
      
      this.getPost( visiblePost )
    } else {
      if( !confirm('¿Desea volver visible el Post a los demas?') ){
        return;
      }
      
      this.spinnerService.show()
      const visiblePost = {
        hide: false
      }
      
      this.getPost( visiblePost )
    }
  }

  getPost( visiblePost: any ) {
    this.postService.editPost( this.postId, visiblePost )
    .subscribe({
      next: _ => {
        this.refreshPost();
        this.spinnerService.hide()
      },
      error: _ => {
        this.spinnerService.hide()
      }
    })
  }

}