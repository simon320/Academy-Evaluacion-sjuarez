import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../posts/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';
import { EmailRegisterService } from '../../../shared/services/email-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  currentUser: User[] = [];
  notPass: boolean = false;
  emailReady: boolean = true;

  registerForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required ], [ this.emailRegister ] ],
    password: [{value: '', disabled: true}, [ Validators.required ]]
  })

  constructor( 
    private fb: FormBuilder,
    private userService: UserService,
    private emailRegister: EmailRegisterService,
    private router: Router,
  ) {}

  inputInvalid( input: string ): boolean | undefined {
    return this.registerForm.get(input)?.invalid
              && this.registerForm.get(input)?.touched;
  }

  getUser() {
    if( this.registerForm.get('email')?.invalid ){
      return;
    }
      const { email }  = this.registerForm.value
      
      this.userService.getUserLogin( email )
      .subscribe({
        next: user => {
          this.currentUser = user
          this.emailReady = false;
          this.registerForm.get('email')?.disable()
          this.registerForm.get('password')?.enable()
        },
        error: err => console.log(err) 
      }) 
  }

  
  login() {
    const { password } = this.registerForm.value

    if ( this.currentUser[0].password === password ){
      localStorage.setItem('currentUser', JSON.stringify( this.currentUser[0] ))
      this.router.navigate(['/post'])
    } else { this.notPass = true }
  }

}

