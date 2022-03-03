export class Validator {
    constructor() {
        this.rules = [];
        this.hasErrors = false;
    }
    validator() { }
    addRules(rules) {
        this.rules = [];
        for (var rule of rules) {
            this.rules.push(rule);
        }
        return this;
    }
    group(errors) {
        const propertyNames = errors.map((r) => r.propertyName).filter((x, i, a) => x && a.indexOf(x) === i);
        const groupedErrors = [];
        for (let propertyName of propertyNames) {
            groupedErrors.push(new ValidationResult(propertyName, errors.filter((x) => x.propertyName === propertyName)));
        }
        return groupedErrors;
    }
    validate() {
        const errors = [];
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
        }
        else {
            this.hasErrors = false;
        }
        return this.group(errors);
    }
}
export class Error {
    constructor(propertyName, error) {
        this.propertyName = propertyName;
        this.error = error;
    }
}
export class Rules {
    constructor(propertyName, rules) {
        this.propertyName = propertyName;
        this.rules = rules;
    }
}
export class ValidationResult {
    constructor(propertyName, errors) {
        this.propertyName = propertyName;
        this.errors = errors;
    }
}
export class Required {
    constructor(value) {
        this.value = value;
    }
    validate() {
        if (!this.value)
            return "Value is required.";
        else if (this.value.trim() === "")
            return "Value is required.";
    }
}
export class MinLength {
    constructor(value, params) {
        this.value = value;
        this.params = params;
    }
    validate() {
        var _a;
        if (((_a = this.value) === null || _a === void 0 ? void 0 : _a.trim().length) < this.params)
            return `Minimun length should not be greater than ${this.params}.`;
    }
}
export class MaxLength {
    constructor(value, params) {
        this.value = value;
        this.params = params;
    }
    validate() {
        var _a;
        if (((_a = this.value) === null || _a === void 0 ? void 0 : _a.trim().length) > this.params)
            return `Maximun length should not be greater than ${this.params}.`;
    }
}
export class MinNotExceedMax {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    validate() {
        if (this.min > this.max)
            return "Min credit cannot be greater than Max credit.";
    }
}
export class Email {
    constructor(value) {
        this.value = value;
    }
    validate() {
        if (this.value !== "") {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(this.value))
                return "Value must match regular expression.";
        }
    }
}
export class Number {
    constructor(value, params) {
        this.value = value;
    }
    validate() {
        var re = /^[0-9]*$/;
        if (!re.test(this.value.toString()))
            return "Value must match regular expression.";
    }
}
export class Phone {
    validate() { }
}
export class Nameformat {
    validate() { }
}
//# sourceMappingURL=validator.js.map