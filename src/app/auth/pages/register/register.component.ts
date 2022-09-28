import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';
import { Router } from '@angular/router';
import { User } from '../../../posts/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';
import { EmailValidatorService } from '../../../shared/services/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.scss']
})
export class RegisterComponent {

  success: boolean = false;
  error: boolean = false;

  registerForm: FormGroup = this.fb.group({
    username: ['', [ Validators.required, Validators.minLength(4), Validators.pattern( this.vs.notEmpty ) ]],
    email: ['', [ Validators.required, Validators.pattern( this.vs.emailPattern )], [ this.emailValidator ] ],
    password: ['', [ Validators.required, Validators.minLength(6), Validators.pattern( this.vs.notEmpty ) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [ this.vs.compareFields('password', 'password2') ]
  })

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

  constructor( 
    private fb: FormBuilder,
    private vs: ValidatorService,
    private userService: UserService,
    private emailValidator: EmailValidatorService,
    private router: Router,
  ) {}

  inputInvalid( input: string ): boolean | undefined {
    return this.registerForm.get(input)?.invalid
              && this.registerForm.get(input)?.touched;
  }

  inputValid( input: string ): boolean | undefined {
    return this.registerForm.get(input)?.valid
              && this.registerForm.get(input)?.touched;
  }

  createRegister(): void {
    if(this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
      return;
    }

    const { username, email, password }  = this.registerForm.value
    const userRegister: User = {
      name: "",
      username,
      email,
      password,
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
    
    this.userService.registerUser( userRegister )
      .subscribe({
        next: _ => {
          this.success = true;
          setTimeout(()=> {
            this.router.navigate(['/auth/login'])
          }, 1000);
        },
        error: _ => {
          this.error = true;
          setTimeout(()=> {
            this.error = false;
            this.registerForm.reset({})
          }, 1500);
        }
      });
  }

}
