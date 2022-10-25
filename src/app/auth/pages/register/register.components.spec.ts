import { RegisterComponent } from "./register.component"
import { FormBuilder } from '@angular/forms';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';

import { UserService } from '../../../user/services/user.service';


class UserTestingSvc {
    register() {
        return of({ abc: "abc" });
      }
    addUser() {
        return of({ abc: "abc" });
    }
}


describe('RegisterComponent', () => {

    let register: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>

    beforeEach(waitForAsync( () => {
        TestBed.configureTestingModule({
            declarations: [ RegisterComponent ],
            providers: [
                FormBuilder,
                { provide: UserService, useClass: UserTestingSvc },
            ]
        }).compileComponents()

    }))

    beforeEach(()=> {
        fixture = TestBed.createComponent(RegisterComponent);
        register = fixture.componentInstance;
    })

    // Componente
    it('El componente se debe instanciar', () => {
        expect( register ).toBeDefined();
        expect( register ).toBeInstanceOf(RegisterComponent);
    })
    // FOMULARIO
    it('Al iniciar el componente se debe crear el formulario con los campos: username, email, password, password2', () => {
        expect( register.registerForm.contains('username') ).toBeTruthy();
        expect( register.registerForm.contains('email') ).toBeTruthy();
        expect( register.registerForm.contains('password') ).toBeTruthy();
        expect( register.registerForm.contains('password2') ).toBeTruthy();
    })

    // Username
    it('El username debe ser obligatorio y se debe retornar el msg: "El nombre de usuario es obligatorio."', () => {
        const control = register.registerForm.get('username');
        control?.setValue('');
        expect( control?.valid ).toBeFalsy();
        expect( register.userErrorMsg ).toBe('El nombre de usuario es obligatorio.');
    })
    it('El username no debe tener menos de 4 caracteres y se debe retornar el msg: "El nombre debe tener al menos 4 caracteres.', () => {
        const control = register.registerForm.get('username');
        control?.setValue('Ivy');
        expect( control?.valid ).toBeFalsy();
        expect( register.userErrorMsg ).toBe('El nombre debe tener al menos 4 caracteres.');
    })
    it('El username no debe contener espacios en blanco y se debe retornar el msg: "Solo puedes usar letras y numeros.', () => {
        const control = register.registerForm.get('username');
        control?.setValue('Iv y');
        expect( control?.valid ).toBeFalsy();
        expect( register.userErrorMsg ).toBe('Solo puedes usar letras y numeros.');
    })
    it('Se debe devolver un string vacio en caso de no haber errores', () => {
        const control = register.registerForm.get('username');
        control?.setValue('Ivvy');
        expect( control?.valid ).toBeTruthy();
        expect( register.userErrorMsg ).toBe('');
    })

    // Email
    it('El email debe ser obligatorio y se debe retornar el msg: "El correo es obligatorio."', () => {
        const control = register.registerForm.get('email');
        control?.setValue('');
        expect( control?.valid ).toBeFalsy();
        expect( register.emailErrorMsg ).toBe('El correo es obligatorio.');
    })
    it('El email debe tener un formato correcto y se debe retornar el msg: "El formato del email es incorrecto."', () => {
        const control = register.registerForm.get('email');
        control?.setValue('simon@gmail');
        expect( control?.valid ).toBeFalsy();
        expect( register.emailErrorMsg ).toBe('El formato del email es incorrecto.');
    })
    it('Se debe devolver el mjs: "Ya hay un usuario registrado con ese email."', () => {
        register.firebaseError('auth/email-already-in-use')
        expect( register.emailErrorMsg ).toBe('Ya hay un usuario registrado con ese email.'); 
    })
    it('Se debe devolver un string vacio en caso de no haber errores', () => {
        const control = register.registerForm.get('email');
        control?.setValue('sumo@gmail.com');

        expect( control?.valid ).toBeTruthy();
        expect( register.emailErrorMsg ).toBe('');
    })

    // Password
    it('El password debe ser obligatorio y se debe retornar el msg: "La contraseña es obligatoria."', () => {
        const control = register.registerForm.get('password');
        control?.setValue('');
        expect( control?.valid ).toBeFalsy();
        expect( register.passErrorMsg ).toBe('La contraseña es obligatoria.');
    })

    it('El password no debe tener menos de 6 caracteres y se debe retornar el mgs: ', () => {
        const control = register.registerForm.get('password');
        control?.setValue('12345');
        expect( control?.valid ).toBeFalsy();
        expect( register.passErrorMsg ).toBe('La contraseña debe tener al menos 6 caracteres.');
    })

    it('El password no debe contener espacios en blanco y se debe retornar el mgs: "Solo puedes usar letras y numeros."', () => {
        const control = register.registerForm.get('password');
        control?.setValue('1234 6');
        expect( control?.valid ).toBeFalsy();
        expect( register.passErrorMsg ).toBe('Solo puedes usar letras y numeros.')
    })
    it('Se debe devolver un string vacio en caso de no haber errores', () => {
        const control = register.registerForm.get('password');
        control?.setValue('123456');
        expect( control?.valid ).toBeTruthy();
        expect( register.passErrorMsg ).toBe('');
    })

    // Confirmacion de password
    it('El password2 debe ser obligatorio', () => {
        const control = register.registerForm.get('password2');
        control?.setValue('');
        expect( control?.valid ).toBeFalsy();
    })
    it('El valor de password y password2 deben ser iguales', () => {
        const control1 = register.registerForm.get('password');
        const control2 = register.registerForm.get('password2');
        control1?.setValue('123456');
        control2?.setValue('123457');
        expect( control2?.valid ).toBeFalsy();
    })

    // inputCheck()
    it('Se debe marcar como invalido el campo', () => {
        const control = register.registerForm.get('password');
        control?.setValue('12345');
        register.inputCheck(control?.value, 'invalid')
        expect( control?.invalid ).toBeTruthy();
    })
    it('Se debe marcar como valido el campo', () => {
        const control = register.registerForm.get('password');
        control?.setValue('123456');
        register.inputCheck(control?.value, 'valid')
        expect( control?.valid ).toBeTruthy();
    })
    it('el metodo debe de retornar "undefined"', () => {
        const control = register.registerForm.get('password');
        control?.setValue('123456');
        register.inputCheck(control?.value, '')
        expect( control?.valid ).toBeTruthy();
    })

    // createRegister()
    it('Debe salir del metodo si algun campo es invalido', () => {
        const control = register.registerForm.get('password');
        control?.setValue('12345');
        register.createRegister();
        expect( register.registerForm.touched ).toBeTruthy();

    });

})