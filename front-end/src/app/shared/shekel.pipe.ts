import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shekel'
})
export class ShekelPipe implements PipeTransform {
  transform(
    value: string,
  ) {

    return value + ' ₪';
  }
}
