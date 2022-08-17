import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post.interface';
import { switchMap } from 'rxjs';
import { ComentariosComponent } from '../../components/comentarios/comentarios.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [
  ]
})
export class DetailsComponent implements OnInit {

  postDetails: Post = {}
  fecha: Date = new Date();
  mostrarFecha: boolean = false;


  constructor( private activatedRoute: ActivatedRoute,
               private postService: PostService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.postService.getPostPorId( id ) )
      )
      .subscribe( post => this.postDetails = post )
    }
 
    emitir() {
        return this.mostrarFecha = !this.mostrarFecha
    }
}
