import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    InputTextareaModule,
    InputTextModule,
    MenubarModule,
    MessageModule,
    PanelModule,
    PasswordModule,
    ProgressSpinnerModule,
    TableModule,
    TooltipModule
  ]
})
export class PrimeNgModule { }
