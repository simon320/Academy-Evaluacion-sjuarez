import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription, switchMap, tap, filter, from, timer } from 'rxjs';

import { Comments } from '../../interfaces/comments.interface';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { User } from '../../../user/interfaces/user.interface';
import { UserService } from 'src/app/user/services/user.service';
import { ValidatorService } from '../../../shared/services/validator.service';
import { ErrorService } from '../../../shared/services/error.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [`
    h4 {
      color: #d3d3d3;
    }
  `]
})
export class DetailsComponent implements OnInit, OnDestroy{

  private subscription!: Subscription;

  date!: Date;
  lastComment!: Comments;
  postDetails!: Post;
  currentUser!: User;
  postForm!: FormGroup;
  showEditPost: boolean = false;
  postId!: string;
  comments!: Comments[];
  commentsForAdmin: Comments[] = []
  commentsForUser: Comments[] = []
  showCommentForm: boolean = true;
  timer$ = timer(2500);
  

  constructor( 
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private spinnerService: SpinnerService,
    private errorService: ErrorService,
    private fb: FormBuilder,
    private vs: ValidatorService,
    private router: Router
  ) { this.createForm() }

  ngOnInit(): void {
    this.getPostById();
    this.getCurrentUser();
    this.getComments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCurrentUser(): void {
    if(!localStorage.getItem('currentUser')){
      return    
    }

    this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
  }

  getPostById(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        tap( ({id}) => this.postId = id ),
        switchMap( ({id}) => this.postService.getPostById( id ))
      )
      .subscribe({
        next: resp => {
          this.postDetails = resp.data()
          this.getAuthor()
          this.date = new Date(this.postDetails.date.seconds*1000)
          this.showCommentForm = !this.postDetails.blockComments
        },
        error: _ => this.router.navigate(['error'])
      });
  }

  getAuthor() {
    this.userService.getUserById( this.postDetails.author?.id! )
    .subscribe({
      next: author => this.postDetails.author = author.data!(),
	    error: _ => {
        this.errorService.show();
        this.timer$.subscribe( _ => this.errorService.hide())
      },
    })
  }

  getComments(): void {
    this.spinnerService.show()
    this.commentService.getAllComments()
      .subscribe({
        next: comments => {
          this.comments = comments
          this.getCommentPost()
          this.getAuthorComment()
          this.getLastComment()
          this.spinnerService.hide()
        },
        error: _ => {
          this.spinnerService.hide();
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
      });
  }
  
  getAuthorComment() {
    this.comments.forEach( comment => {
      this.userService.getUserById( comment.author.id )
      .subscribe({
        next: author => comment.author = author.data!(),
        error: _ => {
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
      })
    })
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

  openEditPost(): void {
    this.postForm.reset({
      title: this.postDetails.title,
      body: this.postDetails.body,
    })
    this.showEditPost = true;
  }

  refreshPost(): void {
    this.postService.getPostById( this.postId )
      .subscribe({
        next: resp => this.postDetails = resp['data'](),
        error: _ => {
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
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

    const amountPost = {
      amountPost: this.currentUser.amountPost - 1
    } 

    this.spinnerService.show()
    this.postService.deletePost( this.postId )
      .subscribe({
        next: _ => {
          this.decrementAmountPost( this.currentUser.id, amountPost)
        },
        error: _ => {
          this.spinnerService.hide()
        }
      });
  }

  decrementAmountPost( id: string, amoutPost: object): void {
    this.userService.editUser( id, amoutPost )
      .subscribe({
        next: _ => {
          this.spinnerService.hide()
          this.router.navigate(['/post'])
        },
        error: _ => {
          this.spinnerService.hide();
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
        },
      })
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

  getPost( visiblePost: object ): void {
    this.postService.editPost( this.postId, visiblePost )
    .subscribe({
      next: _ => {
        this.refreshPost();
        this.spinnerService.hide()
      },
	    error: _ => {
        this.spinnerService.hide();
        this.errorService.show();
        this.timer$.subscribe( _ => this.errorService.hide())
      },
    })
  }

  getCommentPost(): void {
    this.commentsForAdmin = this.comments.filter( comment => comment.postId === this.postId )
    this.commentsForAdmin.sort((a, b) => a.date - b.date)
    
    let arrayComments: any = [];
    from(this.commentsForAdmin)
      .pipe(
        filter( comment => comment.hide === false),
      ).subscribe({
          next: comment => arrayComments.push(comment),
          error: _ => {
            this.errorService.show();
            this.timer$.subscribe( _ => this.errorService.hide())
          },
      })

    this.commentsForUser = arrayComments.reduce( (acc: any, item: any) => {
      if(!acc.includes(item)){
        acc.push(item);
      }
      return acc;
    }, [])
  }
  
  getLastComment(): void {
    if(this.commentsForAdmin.length === 0){
      return;
    }

    this.orderList()
  
    const lastIndex = this.commentsForAdmin.length - 1;
    this.lastComment = this.commentsForAdmin[lastIndex];
  }

  orderList(): Comments[] {
    return this.commentsForAdmin.sort((a, b) => a.date.seconds - b.date.seconds);
  }

  blockComments( hide: boolean ): void {
    if(hide) {
      if( !confirm('¿Desea impedir que se agreguen nuevos comentarios?') ){
        return;
      }
      
      this.spinnerService.show()
      const blockComments = {
        blockComments: true
      }
      this.getPost( blockComments )
      this.showCommentForm = false;
    } else {
      if( !confirm('¿Desea permitir que se agreguen nuevos comentarios?') ){
        return;
      }
      
      this.spinnerService.show()
      const blockComments = {
        blockComments: false
      }
      this.getPost( blockComments )
      this.showCommentForm = true;
    }
  }

}