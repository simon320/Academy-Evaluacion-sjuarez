import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="error$ | async" class="swal__alert">
      <div class="label__container scalein fadein">
          <h3>Ups! Ha ocurrido un error...</h3>
      </div>
    </div>
  `,
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  error$ = this.errorService.error$;

  constructor( private errorService: ErrorService) { }

}
