import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import * as _ from 'underscore';

import { RulesService } from './services/rules.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QuedateApp';

  selectedGender: string;
  selectedNumber: number;
  selectedAge: number;
  disabledNumbers = true;

  selected;

  rule;

  genders = ['Hombre', 'Mujer'];
  endNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  ages = _.range(18, 103);

  constructor(private rulesService: RulesService) {}

  inputsChange() {
    this.disabledNumbers = false;

    if (this.selectedAge > 59) {
      this.rule = this.rulesService.getRule(
        this.selectedAge,
        this.selectedGender
      );
    }

    if (this.selectedNumber) {
      this.rule = this.rulesService.getRule(
        this.selectedAge,
        this.selectedGender,
        this.selectedNumber
      );
    }
  }

  resetAll() {
    this.disabledNumbers = true;

    this.selectedGender = undefined;
    this.selectedNumber = undefined;
    this.rule = undefined;

    this.selected = undefined;
  }
}
