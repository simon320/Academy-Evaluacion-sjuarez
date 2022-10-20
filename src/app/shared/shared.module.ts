import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserComponent } from './components/user/user.component';
import { DefaultImgDirective } from './directives/defaultImg.directive';


@NgModule({
  declarations: [
    AlertComponent,
    ErrorPageComponent,
    HeaderComponent,
    SpinnerComponent,
    UserComponent,
    DefaultImgDirective
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
    UserComponent,
    DefaultImgDirective
  ]
})
export class SharedModule { }
