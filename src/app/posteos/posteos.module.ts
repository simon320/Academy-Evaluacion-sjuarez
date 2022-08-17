import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { AppRoutingModule } from '../app-routing.module';
import { ComentariosComponent } from './components/comentarios/comentarios.component';


@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    ComentariosComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    AppRoutingModule
  ],
  exports: [
    HomeComponent,
    DetailsComponent
  ]
})
export class PosteosModule { }
