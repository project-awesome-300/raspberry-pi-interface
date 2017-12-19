import { Pipe, PipeTransform } from '@angular/core';
import * as i18next from 'i18next';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {

  transform(value: string, ...args) {
    if (args.length > 0) {
      return i18next.t(value, { x: args[0] });
    }
    else {
      return i18next.t(value);
    }
  }
}
