import { Injectable, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../../posts/interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailRegisterService implements AsyncValidator {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

    validate( control: AbstractControl<any, any> ): Observable<ValidationErrors | null> {
        const email = control.value;
        return this.http.get<User[]>( `${ this.baseUrl }/users?q=${ email }`)
            .pipe(
                map( resp => {
                    if ( resp.length !== 0){
                        return ( resp[0].email === email )
                            ? null
                            : { emailNotExists: true }
                    } else return { emailNotExists: true }
                })
            );
    }

}