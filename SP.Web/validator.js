"use strict";
exports.__esModule = true;
exports.Nameformat = exports.Phone = exports.Number = exports.Email = exports.MinLength = exports.Required = exports.ValidationResult = exports.Rules = exports.Error = exports.Validator = void 0;
var Validator = /** @class */ (function () {
    function Validator() {
        this.rules = [];
        this.hasErrors = false;
    }
    Validator.prototype.validator = function () { };
    Validator.prototype.addRules = function (rules) {
        this.rules = [];
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            this.rules.push(rule);
        }
        return this;
    };
    Validator.prototype.group = function (errors) {
        var propertyNames = errors.map(function (r) { return r.propertyName; }).filter(function (x, i, a) { return x && a.indexOf(x) === i; });
        var groupedErrors = [];
        var _loop_1 = function (propertyName) {
            groupedErrors.push(new ValidationResult(propertyName, errors.filter(function (x) { return x.propertyName === propertyName; })));
        };
        for (var _i = 0, propertyNames_1 = propertyNames; _i < propertyNames_1.length; _i++) {
            var propertyName = propertyNames_1[_i];
            _loop_1(propertyName);
        }
        return groupedErrors;
    };
    Validator.prototype.validate = function () {
        var errors = [];
        for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            for (var _b = 0, _c = rule.rules; _b < _c.length; _b++) {
                var r = _c[_b];
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
    };
    return Validator;
}());
exports.Validator = Validator;
var Error = /** @class */ (function () {
    function Error(propertyName, error) {
        this.propertyName = propertyName;
        this.error = error;
    }
    return Error;
}());
exports.Error = Error;
var Rules = /** @class */ (function () {
    function Rules(propertyName, rules) {
        this.propertyName = propertyName;
        this.rules = rules;
    }
    return Rules;
}());
exports.Rules = Rules;
var ValidationResult = /** @class */ (function () {
    function ValidationResult(propertyName, errors) {
        this.propertyName = propertyName;
        this.errors = errors;
    }
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
var Required = /** @class */ (function () {
    function Required(value) {
        this.value = value;
    }
    Required.prototype.validate = function () {
        if (!this.value)
            return "Value is required.";
        else if (this.value.trim() === "")
            return "Value is required.";
    };
    return Required;
}());
exports.Required = Required;
var MinLength = /** @class */ (function () {
    function MinLength(value, params) {
        this.value = value;
        this.params = params;
    }
    MinLength.prototype.validate = function () {
        var _a;
        if (((_a = this.value) === null || _a === void 0 ? void 0 : _a.trim().length) < this.params)
            return "Value does not meet minimum length.";
    };
    return MinLength;
}());
exports.MinLength = MinLength;
var Email = /** @class */ (function () {
    function Email(value) {
        this.value = value;
    }
    Email.prototype.validate = function () {
        if (this.value !== "") {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(this.value))
                return "Value must match regular expression.";
        }
    };
    return Email;
}());
exports.Email = Email;
var Number = /** @class */ (function () {
    function Number(value, params) {
        this.value = value;
    }
    Number.prototype.validate = function () {
        var re = /^[0-9]*$/;
        if (!re.test(this.value.toString()))
            return "Value must match regular expression.";
    };
    return Number;
}());
exports.Number = Number;
var Phone = /** @class */ (function () {
    function Phone() {
    }
    Phone.prototype.validate = function () {
    };
    return Phone;
}());
exports.Phone = Phone;
var Nameformat = /** @class */ (function () {
    function Nameformat() {
    }
    Nameformat.prototype.validate = function () {
    };
    return Nameformat;
}());
exports.Nameformat = Nameformat;
