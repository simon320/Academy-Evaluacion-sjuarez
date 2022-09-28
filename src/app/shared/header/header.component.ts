import { Component, OnInit } from '@angular/core';
import { User } from '../../posts/interfaces/user.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatorService } from '../services/validator.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {

  currentUser!: User;
  success: boolean = false;
  error: boolean = false;
  modalEdit: boolean = false;

  editForm: FormGroup = this.fb.group({
    username: ['', [ Validators.required, Validators.minLength(4), Validators.pattern( this.vs.notEmpty ) ]],
    password: ['', [ Validators.required, Validators.minLength(6), Validators.pattern( this.vs.notEmpty ) ]]
  })

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

  get passErrorMsg(): string {
    const errors = this.editForm.get('password')?.errors;
    if( errors?.['required'] ) {
      return 'La contraseña es obligatoria.'
    } else if( errors?.['minlength'] ) {
      return 'La contraseña debe tener al menos 6 caracteres.'
    } else if( errors?.['pattern'] ) {
      return 'Solo puedes usar letras y numeros.'
    }
    return '';
  }

  constructor( 
    private fb: FormBuilder,
    private vs: ValidatorService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
      this.getCurrentUser()
      this.resetForm()
  }

  resetForm(): void {
    this.editForm.reset({
      username: this.currentUser.username,
      email: this.currentUser.email,
      password: this.currentUser.password
    })
  }

  getCurrentUser(): void {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
  }

  setCurrentUser( user: User): void {
    localStorage.setItem('currentUser', JSON.stringify( user ))
  }

  inputInvalid( input: string ): boolean | undefined {
    return this.editForm.get(input)?.invalid
              && this.editForm.get(input)?.touched;
  }

  inputValid( input: string ): boolean | undefined {
    return this.editForm.get(input)?.valid
              && this.editForm.get(input)?.touched;
  }

  showEditUser(): void {
    this.modalEdit = true;
  }

  saveChanges(): void {
    if ( this.editForm.invalid ) {
      return;
    }

    if (this.editForm.touched){ 
      const { id } = this.currentUser;
      const userEdit: User = {
        id,
        name: "",
        username: this.editForm.get('username')?.value,
        email: this.editForm.get('email')?.value,
        password: this.editForm.get('password')?.value,
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
      }
    
      this.userService.getUserById( userEdit )
        .subscribe({
          next: _ => {
            this.success = true;
            this.setCurrentUser( userEdit )
            setTimeout(()=> {
              this.getCurrentUser();
              this.modalEdit = false;
              this.success = false;
            }, 1500);
          },
          error: _ => {
            this.error = true;
            setTimeout(()=> {
              this.error = false;
            }, 1500);
          }
        })
    }
  }

  close(): void {
    if (this.editForm.touched){ 

      if ( confirm('¿Desea cerrar la ventana? Perdera los cambios.') ){
        this.resetForm();
        this.modalEdit = false;
      } else {
        return;
      }

    } else {
      this.modalEdit = false;
    }
  }

  logout() {
    if ( confirm('¿Desea cerrar la sesion?') ){
      localStorage.removeItem('currentUser');
      this.router.navigate(['/auth/login']);
    } else {
      return;
    }
  }

}
