import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  routeUrl!: string;
  nameUser!: string;

  constructor( 
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
      this.getRouteUrl()
      this.getNameUser()
  }

  getNameUser() {
    if(localStorage.getItem('currentUser')){
      const { username } = JSON.parse(localStorage.getItem('currentUser')!)
      this.nameUser = username;
    }
  }

  getRouteUrl() {
    const url = this.router.url
    const params = url.split("/")
    if(url.includes('/post/')){
        this.routeUrl = `Detalles del Post: ${params[2]}`
        return this.routeUrl
    }
    if(url.includes('/post')){
        this.routeUrl = 'Lista de Posts'
        return this.routeUrl
    }
    if(url.includes('/user')){
        this.routeUrl = 'Perfil de Usuario'
        return this.routeUrl
    } return this.routeUrl
  }

  logout() {
    if ( confirm('¿Desea cerrar la sesion?') ){
      this.userService.logout()
        .then(() => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        })
        .catch( error => console.error(error) )
    } else {
      return;
    }
  }

}
