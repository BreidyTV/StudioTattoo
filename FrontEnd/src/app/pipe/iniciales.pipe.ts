import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iniciales'
})
export class InicialesPipe implements PipeTransform {

  transform(value:string): string {
    if (!value) return '';
    const palabras = value.trim().split(/\s+/);
    return palabras
      .slice(0, 2)
      .map(p => p.charAt(0).toUpperCase())
      .join('');
  }

}
