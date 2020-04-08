export interface IRules {
  groupName: string;
  ageRange: Range;
  strict: boolean;
  rules: Rule[];
  weekDaysAllowed?: number[];
}

export interface Rule {
  number?: number;
  hoursAllowed: Range;
}

export interface Range {
  from: number;
  to?: number;
}

export interface IDaysAllowed {
  gender: string;
  dayAllowed: string[];
}
