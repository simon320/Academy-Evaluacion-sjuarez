import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateBySeconds'
})
export class DatePipe implements PipeTransform {

  transform(value: any): Date {
    const { seconds } = value;
    return new Date(seconds*1000);
  }

}