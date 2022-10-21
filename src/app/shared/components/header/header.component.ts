import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { ErrorService } from '../../services/error.service';
import { PostService } from '../../../posts/services/post.service';
import { Post } from '../../../posts/interfaces/post.interface';
import { SpinnerService } from '../../services/spinner.service';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    header {
      background: #1f2d40;
      border-bottom: 1px solid #51d951;
    }
  `],
})
export class HeaderComponent implements OnInit {
  routeUrl!: string;
  nameUser!: string;
  posts!: Post[];
  timer$ = timer(2500);

  constructor(
    private userService: UserService,
    private postService: PostService,
    private errorService: ErrorService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllPosts();
    this.getNameUser();
  }

  getNameUser(): void {
    if (localStorage.getItem('currentUser')) {
      const { username } = JSON.parse(localStorage.getItem('currentUser')!);
      this.nameUser = username;
    }
  }

  getRouteUrl(): string {
    const url = this.router.url;
    const params = url.split('/');
    if (url.includes('/post/')) {
      let routePost = this.posts.filter( post => post.id === params[2])
      this.routeUrl = `Detalles del Post: ${routePost[0].title}`;
      return this.routeUrl;
    }
    if (url.includes('/post')) {
      this.routeUrl = 'Lista de Posts';
      return this.routeUrl;
    }
    if (url.includes('/user')) {
      this.routeUrl = 'Perfil de Usuario';
      return this.routeUrl;
    }
    return this.routeUrl;
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.getRouteUrl();
      },
      error: (_) => {
        this.errorService.show();
        this.timer$.subscribe((_) => this.errorService.hide());
      },
    });
  }

  logout(): void {
    if (confirm('¿Desea cerrar la sesion?')) {
      this.spinnerService.show();

      this.userService.logout().subscribe({
        next: (_) => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('uid');
          this.router.navigate(['/auth/login']);
          this.spinnerService.hide();
        },
        error: (error) => {
          console.error(error);
          this.spinnerService.hide();
        },
      });
    } else {
      return;
    }
  }
}
