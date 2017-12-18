import { Pipe, PipeTransform } from '@angular/core';
import * as i18next from 'i18next';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {

  transform(value: string, ...args) {
    return i18next.t(value);
  }
}
