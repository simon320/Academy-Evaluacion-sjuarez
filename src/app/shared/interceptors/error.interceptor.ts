import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  timer$ = timer(1500);

  constructor( private errorService: ErrorService) {}

  intercept( request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError( error => {
          this.handleError()
          return throwError(error);
        })
    );
  }

  handleError() {
    this.errorService.show();
    this.timer$.subscribe( _ => this.errorService.hide() )
  }

}