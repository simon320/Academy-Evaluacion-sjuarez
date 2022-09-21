import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alternCase'
})
export class AlternCasePipe implements PipeTransform {

  transform(value: string, isUppercase: boolean = false): string {
    return (isUppercase) ? value.toUpperCase() : value.toLowerCase(); 
  }

}
