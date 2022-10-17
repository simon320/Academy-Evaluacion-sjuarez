import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div *ngIf="isLoading$ | async" class="spinner__container fadein">
      <div class="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  isLoading$ = this.spinnerService.isLoading$;

  constructor( private spinnerService: SpinnerService) { }

}
