import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../posts/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  currentUser!: User;
  wrongCredentials: boolean = false;

  registerForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required ] ],
    password: ['', [ Validators.required ]]
  })

  constructor( 
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  inputInvalid( input: string ): boolean | undefined {
    return this.registerForm.get(input)?.invalid
              && this.registerForm.get(input)?.touched;
  }

  login() {
    const { email, password }  = this.registerForm.value
      
    this.userService.getUserLogin( email, password )
      .subscribe({
        next: user => {
          if(user.length === 0) {
            this.wrongCredentials = true;
          } else {
            this.currentUser = user[0]
            delete this.currentUser.password
            localStorage.setItem('currentUser', JSON.stringify( this.currentUser ))
            this.router.navigate(['/post'])
          }
        },
        error: err => console.log(err) 
      }) 
  }

}

