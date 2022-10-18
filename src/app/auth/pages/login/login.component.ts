import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../posts/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';
import { SpinnerService } from '../../../shared/services/spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  currentUser!: User;
  wrongCredentials: boolean = false;
  loginForm!: FormGroup;

  constructor( 
    private fb: FormBuilder,
    private userService: UserService,
    private spinnerService: SpinnerService,
    private router: Router,
  ) { this.createForm() }
  
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required ] ],
      password: ['', [ Validators.required ]]
    })
  }

  inputInvalid( input: string ): boolean | undefined {
    return this.loginForm.get(input)?.invalid
              && this.loginForm.get(input)?.touched;
  }

  login() {
    const { email, password }  = this.loginForm.value
      
    this.spinnerService.show();

    this.userService.login( email, password )
      .then( ({ user }) => {
        this.spinnerService.hide()
        console.log(user?.uid)
        this.router.navigate(['/post']) 
      }).catch( err => {
          this.spinnerService.hide()
          this.firebaseError(err.code)
      })
      // .then( user => {
      //   if(user.length === 0) {
      //     this.wrongCredentials = true;
      //   } else {
      //     this.currentUser = user[0]
      //     delete this.currentUser.password
      //     localStorage.setItem('currentUser', JSON.stringify( this.currentUser ))
      //     this.router.navigate(['/post'])
      //   }
      // }).catch( err => console.error(err) )

      // .subscribe({
      //   next: user => {
      //     if(user.length === 0) {
      //       this.wrongCredentials = true;
      //     } else {
      //       this.currentUser = user[0]
      //       delete this.currentUser.password
      //       localStorage.setItem('currentUser', JSON.stringify( this.currentUser ))
      //       this.router.navigate(['/post'])
      //     }
      //   },
      //   error: err => console.error(err)
      // }) 
  }

  firebaseError( code: string ): void {
    if(code === 'auth/user-not-found'){
      this.loginForm.get('email')?.setErrors({ wrongEmail: true })
    }
    if(code === 'auth/wrong-password'){
      this.loginForm.get('password')?.setErrors({ wrongPass: true })
    }
  }

}

