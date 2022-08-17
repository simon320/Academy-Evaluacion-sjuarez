import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';


@NgModule({
  exports: [
    ButtonModule,
    PanelModule,
    TableModule
  ]
})
export class PrimeNgModule { }
