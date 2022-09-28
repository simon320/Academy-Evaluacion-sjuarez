import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public notEmpty: string = '[A-Za-z0-9]+';

  compareFields(field1: string, field2: string): ValidationErrors | null {
    return (form: AbstractControl): ValidationErrors | null => {
      const pass1 = form.get(field1)?.value;
      const pass2 = form.get(field2)?.value;

      if (pass1 !== pass2) {
        form.get('password2')?.setErrors({ notEquals: true });
        return { notEquals: true };
      }

      if (form.get('password2')?.touched) {
        form.get('password2')?.setErrors(null);
      }
      return null;
    };
  }

  empty(input: string): ValidationErrors | null {
    return (form: AbstractControl): ValidationErrors | null => {
      const text = form.get(input)?.value;

      if (text) {
        if (text.trim().length === 0) {
          form.get(input)?.setErrors({ empty: true });
          return { empty: true };
        }
      }

      return null;
    };
  }
}
