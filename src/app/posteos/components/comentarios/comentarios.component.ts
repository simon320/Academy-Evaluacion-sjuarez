import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs';

import { Comentarios } from '../../interfaces/comentarios.interface';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post.interface';

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

  fecha: Date = new Date();
  comentarios: Comentarios[] = [];
  mostrarFecha: boolean = false;
  validationToggle: boolean = false;
  labelButton: string = "Cambiar a Mayuscula";

  @Output() dateEvent = new EventEmitter<boolean>();

  constructor( private postService: PostService,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.postService.getComentarios( id ) )
      )
      .subscribe( resp => this.comentarios = resp )
  }

  emitirFecha() {
    this.dateEvent.emit(this.mostrarFecha)
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
