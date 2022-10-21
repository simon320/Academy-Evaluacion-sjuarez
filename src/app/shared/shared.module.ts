import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { DefaultImgDirective } from './directives/defaultImg.directive';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    AlertComponent,
    ErrorPageComponent,
    HeaderComponent,
    SpinnerComponent,
    DefaultImgDirective,
    MapComponent
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
    MapComponent,
    PrimeNgModule,
    SpinnerComponent,
    DefaultImgDirective
  ]
})
export class SharedModule {}