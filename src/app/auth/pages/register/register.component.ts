import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { timer } from 'rxjs';

import { ErrorService } from '../../../shared/services/error.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { User } from '../../../user/interfaces/user.interface';
import { UserService } from '../../../user/services/user.service';
import { ValidatorService } from '../../../shared/services/validator.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {

  registerForm!: FormGroup;
  uid!: string;
  timer$ = timer(2500);

  constructor( 
    private fb: FormBuilder,
    private vs: ValidatorService,
    private userService: UserService,
    private errorService: ErrorService,
    private spinnerService: SpinnerService,
    private router: Router,
  ) { this.createForm(); }

  get userErrorMsg(): string {
    const errors = this.registerForm.get('username')?.errors;
    if( errors?.['required'] ) {
      return 'El nombre de usuario es obligatorio.'
    } else if( errors?.['minlength'] ) {
      return 'El nombre debe tener al menos 4 caracteres.'
    } else if( errors?.['pattern'] ) {
      return 'Solo puedes usar letras y numeros.'
    }
    return '';
  }

  get emailErrorMsg(): string {
    const errors = this.registerForm.get('email')?.errors;
    if( errors?.['required'] ) {
      return 'El correo es obligatorio.'
    } else if( errors?.['pattern'] ) {
      return 'El formato del email es incorrecto.'
    } else if( errors?.['emailExists'] ) {
      return 'Ya hay un usuario registrado con ese email.'
    }
    return '';
  }

  get passErrorMsg(): string {
    const errors = this.registerForm.get('password')?.errors;
    if( errors?.['required'] ) {
      return 'La contraseña es obligatoria.'
    } else if( errors?.['minlength'] ) {
      return 'La contraseña debe tener al menos 6 caracteres.'
    } else if( errors?.['pattern'] ) {
      return 'Solo puedes usar letras y numeros.'
    }
    return '';
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(4), Validators.pattern( this.vs.notEmpty ) ]],
      email: ['', [ Validators.required, Validators.pattern( this.vs.emailPattern )] ],
      password: ['', [ Validators.required, Validators.minLength(6), Validators.pattern( this.vs.notEmpty ) ]],
      password2: ['', [ Validators.required ]]
    }, {
      validators: [ this.vs.compareFields('password', 'password2') ]
    })
  }

  inputCheck( input: string, type: string ): boolean | undefined {
    if( type === 'invalid' ) {
      return this.registerForm.get(input)?.invalid
        && this.registerForm.get(input)?.touched;
    } else if( type === 'valid' ){
      return this.registerForm.get(input)?.valid
        && this.registerForm.get(input)?.touched;
    } else { return undefined }

  }

  createRegister(): void {
    if(this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
      return;
    }
    this.spinnerService.show();

    const { email, password }  = this.registerForm.value
   
    this.userService.register( email, password )
      .subscribe({
        next: resp => {
        this.uid = resp.user?.uid!
        this.createUser();
      },
        error: err => {
          this.spinnerService.hide()
          this.firebaseError(err.code)
      }
    })
  }

  createUser(): void {
    const { username, email }  = this.registerForm.value

    const userRegister: User = {
      id: this.uid,
      name: '',
      username: username,
      email: email,
      photoUrl: '',
      birthday: '',
      amountPost: 0,
      rol: 'Usuario',
      city: '',
    }

    this.userService.addUser( this.uid, userRegister )
      .subscribe({
        next: _ => {
          this.router.navigate(['/auth/login'])
          this.spinnerService.hide()
      },
        error: _ => {
          this.spinnerService.hide()
          this.errorService.show();
          this.timer$.subscribe( _ => this.errorService.hide())
      }
    })
  }

  firebaseError( code: string ): void {
    if(code === 'auth/email-already-in-use'){
      this.registerForm.get('email')?.setErrors({ emailExists: true })
    }
  }
}
