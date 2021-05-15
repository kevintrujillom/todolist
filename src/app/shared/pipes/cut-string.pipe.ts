import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutString'
})
export class CutStringPipe implements PipeTransform {

  transform(value: string): any {

    if (value.length > 30) {

      return value.substr(0, 30) + '...';
    
    } else {

      return value;
    }

  }

}
