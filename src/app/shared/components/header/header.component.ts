import { Component, OnInit } from '@angular/core';
import { User } from '../../../posts/interfaces/user.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  uid!: string;
  currentUser!: any;
  success: boolean = false;
  error: boolean = false;
  modalEdit: boolean = false;
  checkPass: boolean = false;
  wrongPass: boolean = false;
  editForm!: FormGroup;
  editFormPass!: FormGroup;
  routeUrl!: string;
  // timer$ = timer(1500);

  constructor( 
    private fb: FormBuilder,
    private vs: ValidatorService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
      this.getCurrentUser() 
      this.createForm()
      this.resetForm()
      this.getRouteUrl()
  }

  createForm(): void {
    this.editForm = this.fb.group({
      username: ['', [ Validators.required, Validators.pattern( this.vs.notEmpty ) ]],
      name: ['', [ Validators.required, Validators.minLength(4), Validators.pattern( this.vs.nameAndLastNamePattern) ]],
      phone: ['', [ Validators.required, Validators.minLength(10) ]],
    })

    this.editFormPass = this.fb.group({
      password: ['', [ Validators.required] ],
      newPassword: ['', [ Validators.required, Validators.minLength(6), Validators.pattern( this.vs.notEmpty ) ]],
      confirmNewPassword: ['', [ Validators.required ]]
    }, {
      validators: [ this.vs.compareFields('newPassword', 'confirmNewPassword') ]
    })
  }

  getRouteUrl() {
    const url = this.router.url
    const params = url.split("/")
    if(url.includes('/post/')){
        return this.routeUrl = `Detalles del Post: ${params[2]}`
    }
    if(url.includes('/post')){
        return this.routeUrl = 'Lista de Posts'
    }
    return 'Home'
  }
  
  get userErrorMsg(): string {
    const errors = this.editForm.get('username')?.errors;
    if( errors?.['required'] ) {
      return 'El nombre de usuario es obligatorio.'
    } else if( errors?.['minlength'] ) {
      return 'El nombre debe tener al menos 4 caracteres.'
    } else if( errors?.['pattern'] ) {
      return 'Solo puedes usar letras y numeros.'
    }
    return '';
  }

  get nameErrorMsg(): string {
    const errors = this.editForm.get('name')?.errors;
    if( errors?.['required'] ) {
      return 'El nombre de usuario es obligatorio.'
    } else if( errors?.['pattern'] ) {
      return 'El campo debe tener un apellido y un nombre.'
    }
    return '';
  }

  get phoneErrorMsg(): string {
    const errors = this.editForm.get('phone')?.errors;
    if( errors?.['required'] ) {
      return 'El nombre de usuario es obligatorio.'
    } else if( errors?.['minlength']) {
      return 'El numero no es correcto.'
    }
    return '';
  }

  get passErrorMsg(): string {
    const errors = this.editFormPass.get('newPassword')?.errors;
    if( errors?.['required'] ) {
      return 'La contraseña es obligatoria.'
    } else if( errors?.['minlength'] ) {
      return 'La contraseña debe tener al menos 6 caracteres.'
    } else if( errors?.['pattern'] ) {
      return 'Solo puedes usar letras y numeros.'
    }
    return '';
  }

  resetForm(): void {
    this.editForm.reset({
      name: this.currentUser.name,
      username: this.currentUser.username,
    })
  }

  getCurrentUser(): void {
    if(!localStorage.getItem('currentUser')){
      return    
    }

    this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
  }

  setCurrentUser( user: User): void {
    localStorage.setItem('currentUser', JSON.stringify( user ))
  }

  inputCheck( form: FormGroup, input: string, type: string ): boolean | undefined {
    if( type === 'invalid' ) {
      return form.get(input)?.invalid
        && form.get(input)?.touched;
    } else if( type === 'valid' ){
      return form.get(input)?.valid
        && form.get(input)?.touched;
    } else { return undefined }

  }

  // getPassword(): void {
  //   this.userService.getUserByEmail( this.currentUser.email )
  //   .subscribe({
  //     next: user => {
  //       const { password } = user[0]
  //       if ( password ) {
  //          this.currentUserPassword = password
  //       }
  //     },
  //     error: err => console.error(err)
  //   })
  // }

  showEditUser(): void {
    this.modalEdit = true;
    // this.getPassword();
  }

  confirmPass() {
    // const password = this.editFormPass.get('password')?.value
    // if( password === this.currentUserPassword ) {
    //   this.checkPass = true;
    //   this.wrongPass = false;
    // } else {
    //   this.wrongPass = true;
    // }
  }

  savePersonalData(): void {
    if(this.editForm.invalid) {
      return
    }

    if ( this.editForm.touched ){
      // const { id, email } = this.currentUser;
      // const userEdit: User = {
      //   id,
      //   name: this.editForm.get('name')?.value,
      //   username: this.editForm.get('username')?.value,
      //   password: this.currentUserPassword,
      //   email,
      //   photo: '',
      //   birthday: '',
      //   amountPost: 0,
      //   admin: false,
      //   address: {
      //       city: "",
      //       geo: {
      //           lat: "",
      //           lng: ""
      //       }
      //   },
      // }

      // this.uploadChange( userEdit )
    }
  }

  savePassword(): void {
    if(this.editFormPass.invalid) {
      return
    }

    if ( this.editFormPass.touched ){
      // const { id, email } = this.currentUser;
      // const userEdit: User = {
      //   id,
      //   name: this.currentUser.name,
      //   username: this.currentUser.username,
      //   password: this.editFormPass.get('newPassword')?.value,
      //   email,
      //   photo: '',
      //   birthday: '',
      //   amountPost: 0,
      //   admin: false,
      //   address: {
      //       city: "",
      //       geo: {
      //           lat: "",
      //           lng: ""
      //       }
      //   },
      // }

      // this.uploadChange( userEdit )
    }
  }

  uploadChange( userEdit: User ) {
    // this.userService.getUserById( userEdit )
    //     .subscribe({
    //       next: _ => {
    //         this.success = true;
    //         delete userEdit.password
    //         this.setCurrentUser( userEdit )
    //         this.timer$.subscribe( _ => {
    //           this.getCurrentUser();
    //           this.modalEdit = false;
    //           this.success = false;
    //         });
    //       },
    //       error: _ => {
    //         this.error = true;
    //         this.timer$.subscribe( _ => {
    //           this.error = false;
    //         });
    //       }
    //     })
  }

  close(): void {
    if (this.editForm.touched){ 

      if ( confirm('¿Desea cerrar la ventana? Perdera los cambios.') ){
        this.resetForm();
        this.modalEdit = false;
        this.checkPass = false;
      } else {
        return;
      }

    } else {
      this.modalEdit = false;
    }
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
