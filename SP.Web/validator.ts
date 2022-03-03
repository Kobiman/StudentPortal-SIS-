export class Validator {
  validator() {}

  private rules: Rules[] = [];
  hasErrors: boolean = false;

  addRules(rules: Rules[]) {
    this.rules = [];
    for (var rule of rules) {
      this.rules.push(rule);
    }
    return this;
  }

  group(errors: Error[]) {
    const propertyNames = errors.map((r) => r.propertyName).filter((x, i, a) => x && a.indexOf(x) === i);
    const groupedErrors: ValidationResult[] = [];
    for (let propertyName of propertyNames) {
      groupedErrors.push(
        new ValidationResult(
          propertyName,
          errors.filter((x) => x.propertyName === propertyName)
        )
      );
    }
    return groupedErrors;
  }

  validate(): ValidationResult[] {
    const errors: Error[] = [];
    for (const rule of this.rules) {
      for (const r of rule.rules) {
        var error = r.validate();
        if (error) {
          errors.push(new Error(rule.propertyName, error));
        }
      }
    }
    if (errors.length > 0) {
      this.hasErrors = true;
    } else {
      this.hasErrors = false;
    }
    return this.group(errors);
  }
}

export class Error {
  constructor(propertyName: string, error: string) {
    this.propertyName = propertyName;
    this.error = error;
  }
  propertyName: string;
  error: string;
}

export class Rules {
  constructor(propertyName: string, rules: IValidationRule[]) {
    this.propertyName = propertyName;
    this.rules = rules;
  }

  propertyName: string;
  rules: IValidationRule[];
}

export class ValidationResult {
  constructor(propertyName: string, errors: Error[]) {
    this.propertyName = propertyName;
    this.errors = errors;
  }
  propertyName: string;
  errors: Error[];
}

export interface IValidationRule {
  validate();
}

export class Required implements IValidationRule {
  constructor(private value) {}

  validate() {
    if (!this.value) return "Value is required.";
    else if (this.value.trim() === "") return "Value is required.";
  }
}

export class MinLength implements IValidationRule {
  constructor(private value: string, private params: number) {}

  validate() {
    if (this.value?.trim().length < this.params) return `Minimun length should not be greater than ${this.params}.`;
  }
}

export class MaxLength implements IValidationRule {
  constructor(private value: string, private params: number) {}

  validate() {
    if (this.value?.trim().length > this.params) return `Maximun length should not be greater than ${this.params}.`;
  }
}

export class MinNotExceedMax implements IValidationRule {
  constructor(private min: number, private max: number) {}

  validate() {
    if (this.min > this.max) return "Min credit cannot be greater than Max credit.";
  }
}

export class Email implements IValidationRule {
  constructor(private value: string) {}
  validate() {
    if (this.value !== "") {
      var re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.value)) return "Value must match regular expression.";
    }
  }
}

export class Number implements IValidationRule {
  constructor(private value: number, params) {}
  validate() {
    var re = /^[0-9]*$/;
    if (!re.test(this.value.toString())) return "Value must match regular expression.";
  }
}

export class Phone implements IValidationRule {
  validate() {}
}

export class Nameformat implements IValidationRule {
  validate() {}
}
