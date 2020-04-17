import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import * as _ from 'underscore';

import { RulesService } from './services/rules.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'QuedateApp';

  selectedGender: string;
  selectedNumber: number;
  selectedGroup: string;
  disabledNumbers = true;

  selected;

  rule;

  genders = ['Hombre', 'Mujer'];
  endNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  ages = this.rulesService.getListRules();

  constructor(private rulesService: RulesService, private updateService: UpdateService) {}

  ngOnInit(){

    // Verifico si hay nueva versión del app
    this.updateService.check();
  }
  inputsChange() {
    this.disabledNumbers = false;

    this.rule = this.rulesService.getRule(
      this.selectedGroup,
      this.selectedGender,
      this.selectedNumber
    );
  }

  resetAll() {
    this.disabledNumbers = true;

    this.selectedGender = undefined;
    this.selectedNumber = undefined;
    this.rule = undefined;

    this.selected = undefined;
  }
}
