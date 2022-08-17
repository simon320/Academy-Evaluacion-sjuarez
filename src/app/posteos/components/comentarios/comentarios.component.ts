import { Component, Input, OnInit } from '@angular/core';
import { Comentarios } from '../../interfaces/comentarios.interface';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styles: [`
    p-panel{
      margin: 2rem;
    }
  `]
})
export class ComentariosComponent implements OnInit {

  @Input() postDetails: Post = {};

  comentarios: Comentarios[] = []

  constructor( private postService: PostService,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.postService.getComentarios( id ) )
      )
      .subscribe( resp => this.comentarios = resp )

  }

  // coment(id: string){
  //   this.postService.getComentarios(id)
  //   .subscribe( resp => {
  //     this.comentarios = resp
  //     console.log(resp)
  //   } )
  // }

}
