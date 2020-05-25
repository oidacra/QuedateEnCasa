import { Injectable } from '@angular/core';

import * as _ from 'underscore';
import { IRules, IDaysAllowed, Rule } from '../models/Rules';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private __MINUTES_ALLOWED_BEFORE = 30;
  private __MINUTES_ALLOWED_AFTER = 30;
  private __MAX_MINUTES_ALLOWED = 60;

  // Rule by gender
  private __DAY_ALLOWED_BY_GENTER: IDaysAllowed[] = [
    { gender: 'Hombre', dayAllowed: ['martes', 'jueves', 'sabado'] }, // martes, jueves, sabado
    { gender: 'Mujer', dayAllowed: ['lunes', 'miércoles', 'viernes'] }, // lunes, miercoles, viernes
  ];
  // Rules
  private __GROUP_AGE: IRules[] = [
    {
      groupName: 'group-1',
      label: 'De 18 a 59 años',
      ageRange: { from: 18, to: 59 },
      strict: false,
      rules: [
        { number: 0, hoursAllowed: { from: 10 } },
        { number: 1, hoursAllowed: { from: 13 } },
        { number: 2, hoursAllowed: { from: 14 } },
        { number: 3, hoursAllowed: { from: 15 } },
        { number: 4, hoursAllowed: { from: 16 } },
        { number: 5, hoursAllowed: { from: 17 } },
        { number: 6, hoursAllowed: { from: 18 } },
        { number: 7, hoursAllowed: { from: 7 } },
        { number: 8, hoursAllowed: { from: 8 } },
        { number: 9, hoursAllowed: { from: 9 } },
      ],
    },
    {
      groupName: 'group-2',
      label: '60 años o más',
      ageRange: { from: 60, to: 102 },
      strict: true,
      rules: [{ hoursAllowed: { from: 11, to: 13 } }],
    },
  ];
  public getListRules() {
    return _.map(this.__GROUP_AGE, (val) => {
      return { value: val.groupName, label: val.label };
    });
  }
  public getRule(
    selectedGroup: string,
    selectedGender: string,
    selectedNumber?: number
  ) {
    let hoursOut;
    const ruleByAge: IRules = this.__getRule(selectedGroup);

    if (ruleByAge.strict === false && selectedNumber !== undefined) {
      hoursOut = _.find(ruleByAge.rules, (val) => {
        return val.number == selectedNumber;
      });
    }

    if (ruleByAge.strict === true && selectedNumber === undefined) {
      hoursOut = _.first(ruleByAge.rules);
    }

    if (hoursOut !== undefined) {
      return {
        schedule: this.__fixHoursAllowed(ruleByAge.strict, hoursOut),
        days: this.__getWeekDayByGender(selectedGender).join(', '),
      };
    }

    return false;
  }

  // Obtengo la regla segun edad y fin de cédula
  private __getRule(selectedGroup: string) {
    return _.find(this.__GROUP_AGE, (group) => {
      return group.groupName === selectedGroup;
    });
  }

  private __getWeekDayByGender(gender) {
    const daysByGender = _.filter(this.__DAY_ALLOWED_BY_GENTER, (weekDays) => {
      return weekDays.gender === gender;
    });
    return daysByGender[0].dayAllowed;
  }

  private __fixHoursAllowed(strict: boolean, hour: Rule) {
    // Si es strict = true tiene rango de salida sin tomar
    // en cuenta los minutos antes o despues

    if (strict === true) {
      return {
        from: hour.hoursAllowed.from + ':00',
        hour: hour.hoursAllowed.from + ':00',
        to: hour.hoursAllowed.to + ':00',
      };
    } else {
      // Convert to minutes
      const fromMinutes =
        hour.hoursAllowed.from * 60 - this.__MINUTES_ALLOWED_AFTER;
      const toMinutes =
        hour.hoursAllowed.from * 60 +
        this.__MAX_MINUTES_ALLOWED +
        this.__MINUTES_ALLOWED_BEFORE;

      // Conver to hours
      const fromHour =
        Math.floor(fromMinutes / 60) +
        ':' +
        (fromMinutes - Math.floor(fromMinutes / 60) * 60);

      const toHour =
        Math.floor(toMinutes / 60) +
        ':' +
        (toMinutes - Math.floor(toMinutes / 60) * 60);

      return {
        from: fromHour,
        hour: hour.hoursAllowed.from + ':00',
        to: toHour,
      };
    }
  }
}
