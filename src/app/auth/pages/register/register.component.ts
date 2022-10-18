import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';
import { Router } from '@angular/router';
import { User } from '../../../posts/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';
import { SpinnerService } from '../../../shared/services/spinner.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {

  registerForm!: FormGroup;
  uid!: string;

  constructor( 
    private fb: FormBuilder,
    private vs: ValidatorService,
    private userService: UserService,
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

  createForm() {
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

  async createRegister() {
    if(this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
      return;
    }
    this.spinnerService.show();

    const { username, email, password }  = this.registerForm.value
   
    await this.userService.register( email, password )
      .then( resp => {
        this.uid = resp.user?.uid!
      })
      .catch( err => {
        this.spinnerService.hide()
        this.firebaseError(err.code)
      })

    const userRegister: any = {
      name: '',
      username: username,
      email: email,
      photo: '',
      birthday: '',
      amountPost: 0,
      admin: false,
      address: {
          city: '',
          geo: {
              lat: '',
              lng: ''
          }
      },
    }
    

    await this.userService.addUser( this.uid, userRegister )
      .then(_ => {
        this.router.navigate(['/auth/login'])
        this.spinnerService.hide()
      })
      .catch( err => {
        this.spinnerService.hide()
      })

  }

  firebaseError( code: string ): void {
    if(code === 'auth/email-already-in-use'){
      this.registerForm.get('email')?.setErrors({ emailExists: true })
    }
  }

}
