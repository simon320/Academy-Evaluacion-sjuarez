import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    AlertComponent,
    ErrorPageComponent,
    HeaderComponent,
    SpinnerComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertComponent,
    ErrorPageComponent,
    HeaderComponent,
    PrimeNgModule,
    SpinnerComponent,
    UserComponent
  ]
})
export class SharedModule { }
