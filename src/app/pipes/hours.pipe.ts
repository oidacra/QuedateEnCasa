import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {
  transform(value: string) {
    let twelveHours;
    twelveHours = value
      .toString()
      .match(/^([01]?[0-9]|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [value];

    if (twelveHours.length > 1) {
      twelveHours = twelveHours.slice(1);
      twelveHours[5] = +twelveHours[0] < 12 ? ' AM' : ' PM';
      twelveHours[0] = +twelveHours[0] % 12 || 12;
    }

    return twelveHours.join('');
  }
}
