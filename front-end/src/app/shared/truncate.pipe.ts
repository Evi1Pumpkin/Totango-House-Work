import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit = 35,
    completeWords = false,
    ellipsis = '...'
  ) {
    if (value && value.length > 0) {
      if (completeWords) {
        limit = value.substr(0, limit).lastIndexOf(' ');
      }
      return value.length > limit ? value.substr(0, limit) + ellipsis : value;
    }

    return '';
  }
}
