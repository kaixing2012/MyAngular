import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  constructor(
   private readonly decimalPipe: DecimalPipe
  ) { }

  transform(value: any, args?: any): any {

    if (value === undefined || value === null) {
      return;
    }

    if (typeof value === 'number' || typeof value === 'string') {

      let decimalStr: string;

      if (args === 'TWD') {
        decimalStr = '1.0-0';
      } else {
        decimalStr = '1.2-2';
      }

      const valFormatted = this.decimalPipe
        .transform(value, decimalStr);

      return `${args} ${valFormatted}`;

    } else {
      throw new Error('Invalid type pass into currency pipe.');
    }
  }
}
