import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    ErrorPageComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [
    ErrorPageComponent,
    HeaderComponent,
    PrimeNgModule,
    SpinnerComponent
  ]
})
export class SharedModule { }
