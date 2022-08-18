import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alternCase'
})
export class AlternCasePipe implements PipeTransform {

  transform(value: string, enMayusculas: boolean = false): string {
    return (enMayusculas) ? value.toUpperCase() : value.toLowerCase(); 
  }

}
