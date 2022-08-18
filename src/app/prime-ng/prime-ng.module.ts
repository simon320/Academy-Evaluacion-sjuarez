import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';


@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    PanelModule,
    TableModule
  ]
})
export class PrimeNgModule { }
