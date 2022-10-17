import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor( private userService: UserService ) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return this.userService.getUserByEmail( email )
        .pipe(
            map( resp => {
                return ( resp.length === 0 )
                    ? null
                    : { emailExists: true }
            })
        );
  }

}