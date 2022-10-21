import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../posts/interfaces/user.interface';
import { SpinnerService } from '../../services/spinner.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    uid!: string;
    currentUser!: User;
    success: boolean = false;
    error: boolean = false;
    editForm!: FormGroup;
    locationForm!: FormGroup;
    routeUrl!: string;
    timer$ = timer(1500);
    showPosition: boolean = false;
    lngLat!: [number, number];

  
    constructor( 
      private fb: FormBuilder,
      private vs: ValidatorService,
      private userService: UserService,
      private spinnerService: SpinnerService,
      private router: Router
    ) { }
  
    ngOnInit() {
        this.getCurrentUser() 
        this.createForm()
        this.resetForm()
        this.uid = localStorage.getItem('uid')!;
    }
  
    createForm(): void {
      this.editForm = this.fb.group({
        name: [''],
        username: ['', [ Validators.required, Validators.pattern( this.vs.notEmpty ) ]],
        birthday: [''],
        city: [''],
        photoUrl: [''],
      })

      this.locationForm = this.fb.group({
        latitude: [{value:'', disabled: true}],
        longitude: [{value:'', disabled: true}]
      })
    }

    get userErrorMsg(): string {
      const errors = this.editForm.get('username')?.errors;
      if( errors?.['required'] ) {
        return 'El nombre de usuario es obligatorio.'
      } else if( errors?.['minlength'] ) {
        return 'El nombre debe tener al menos 4 caracteres.'
      } else if( errors?.['pattern'] ) {
        return 'Solo puedes usar letras y numeros.'
      }
      return '';
    }
  
    resetForm(): void {
      this.editForm.reset({
        name: this.currentUser.name,
        username: this.currentUser.username,
        birthday: this.currentUser.birthday,
        city: this.currentUser.city,
        photoUrl: this.currentUser.photoUrl,
      })
      this.editForm.untouched;
    }
  
    getCurrentUser(): void {
      if(!localStorage.getItem('currentUser')){
        return    
      }
      this.currentUser = JSON.parse( localStorage.getItem('currentUser')! )
    }
  
    setCurrentUser( user: User): void {
      localStorage.setItem('currentUser', JSON.stringify( user ))
    }

    getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.locationForm.reset({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        
        return this.lngLat = [position.coords.longitude, position.coords.latitude]
      });
    }

    showMap() {
      this.showPosition = true;
    }

    closeLocation() {
      this.showPosition = false;
    }
  
    inputCheck( form: FormGroup, input: string, type: string ): boolean | undefined {
      if( type === 'invalid' ) {
        return form.get(input)?.invalid && form.get(input)?.touched;
      } else if( type === 'valid' ){
        return form.get(input)?.valid && form.get(input)?.touched;
      } else { return undefined }
    }
  
    saveEditData(): void {
      if(this.editForm.invalid) {
        return
      }
  
      if ( this.editForm.touched ){
        this.spinnerService.show()
        const userEdit: User = {
          id: this.currentUser.id,
          name: this.editForm.get('name')?.value,
          username: this.editForm.get('username')?.value,
          email: this.currentUser.email,
          photoUrl: this.editForm.get('photoUrl')?.value,
          birthday: this.editForm.get('birthday')?.value,
          amountPost: this.currentUser.amountPost,
          rol: this.currentUser.rol,
          city: this.editForm.get('city')?.value,
        }
      
        this.userService.editUser( this.uid, userEdit )
          .subscribe({ 
            next: _ => {
              this.setCurrentUser(userEdit)
              this.resetForm()
              this.spinnerService.hide()
              this.success = true;
              this.timer$.subscribe( _ => {
                this.success = false
                this.router.navigate(['/post'])
              } )
            }, 
            error: _ => {
              this.spinnerService.hide()
            }
          });
      }
    }
  
    close(): void {
      if (this.editForm.touched){ 
  
        if ( confirm('¿Desea cerrar la ventana? Perdera los cambios.') ){
          this.resetForm();
          this.router.navigate(['./post'])
        } else {
          return;
        }
  
      } else {
        this.router.navigate(['./post'])
      }
    }
  
  }
