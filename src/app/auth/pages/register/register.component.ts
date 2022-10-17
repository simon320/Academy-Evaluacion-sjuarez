import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';
import { Router } from '@angular/router';
import { User } from '../../../posts/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';
import { EmailValidatorService } from '../../../shared/services/email-validator.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {

  success: boolean = false;
  error: boolean = false;
  registerForm!: FormGroup;
  timer$ = timer(1500);

  constructor( 
    private fb: FormBuilder,
    private vs: ValidatorService,
    private userService: UserService,
    private validator: EmailValidatorService,
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
      email: ['', [ Validators.required, Validators.pattern( this.vs.emailPattern )], [ this.validator ] ],
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
          this.timer$.subscribe( _ => {
            this.router.navigate(['/auth/login'])
          });
        },
        error: _ => {
          this.error = true;
          this.timer$.subscribe( _ => {
            this.error = false;
            this.registerForm.reset({})
          });
        }
      });
  }

}
