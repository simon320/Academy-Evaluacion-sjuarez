import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';

import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { MenubarModule } from 'primeng/menubar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';



@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    PanelModule,
    PasswordModule,
    TableModule,

    MessageModule,
    ProgressSpinnerModule,
    MenubarModule,
    DynamicDialogModule
  ]
})
export class PrimeNgModule { }
