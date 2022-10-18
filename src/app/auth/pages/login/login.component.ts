import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { SpinnerService } from '../../../shared/services/spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  currentUser!: any;
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
        this.getCurrentUser(user?.uid!).then(_ => {
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
          this.router.navigate(['/post']) 
          this.spinnerService.hide()
        })
      }).catch( err => {
          this.spinnerService.hide()
          this.firebaseError(err.code)
      })

  }

  async getCurrentUser(uid: string) {
    const docSnap = await this.userService.getUserById(uid)
    this.currentUser = docSnap.data();
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

