import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PostsModule } from './posts/posts.module';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

import localEs from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HeaderComponent } from './shared/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

registerLocaleData( localEs );


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PostsModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
