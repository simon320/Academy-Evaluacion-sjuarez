import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { ErrorService } from '../../../shared/services/error.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { UserService } from '../../../user/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  currentUser!: any;
  wrongCredentials: boolean = false;
  loginForm!: FormGroup;
  timer$ = timer(1500);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private errorService: ErrorService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  inputInvalid(input: string): boolean | undefined {
    return (
      this.loginForm.get(input)?.invalid && this.loginForm.get(input)?.touched
    );
  }

  login(): void {
    const { email, password } = this.loginForm.value;

    this.spinnerService.show();

    this.userService.login( email, password ).subscribe({ 
      next: ({ user }) => {
        this.getCurrentUser(user?.uid!)
        localStorage.setItem('uid', user?.uid!)
      },
      error: ( err => {
          this.spinnerService.hide()
          this.firebaseError(err.code)
      })
    })

  }

  getCurrentUser(uid: string): void {
    this.userService.getUserById(uid).subscribe({
      next: (resp) => {
        this.currentUser = resp.data!();
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.router.navigate(['/post']);
      },
      error: _ => {
        this.errorService.show();
        this.timer$.subscribe( _ => this.errorService.hide())
      },
    });
  }

  firebaseError(code: string): void {
    if (code === 'auth/user-not-found') {
      this.loginForm.get('email')?.setErrors({ wrongEmail: true });
    }
    if (code === 'auth/wrong-password') {
      this.loginForm.get('password')?.setErrors({ wrongPass: true });
    }
  }
}

