import { Student } from "../models/student";
import { ViewModelHelper } from "../viewModelHelper";
import { Rules, Required, Validator, MinLength, Email } from "../validator";
import { App } from "../app";

export class AddStudentVm {
  student: Student;
  maritalStatus = ["Single", "Married", "Widoowed"];

  validator: Validator;
  viewModelHelper: ViewModelHelper;

  constructor() {
    this.student = new Student();
    this.validator = new Validator();
    this.viewModelHelper = new ViewModelHelper();
  }

  stage1_rules() {
    return [
      new Rules("IndexNumber", [new Required(this.student.IndexNumber), new MinLength(this.student.IndexNumber, 8)]),
      new Rules("Othernames", [new Required(this.student.Othernames), new MinLength(this.student.Othernames, 2)]),
      new Rules("ReferenceNumber", [new Required(this.student.ReferenceNumber), new MinLength(this.student.ReferenceNumber, 8)]),
      new Rules("Surname", [new Required(this.student.Surname), new MinLength(this.student.Surname, 2)]),
      new Rules("DateofBirth", [new Required(this.student.DateofBirth)]),
      new Rules("Gender", [new Required(this.student.Gender)]),
      new Rules("MaritalStatus", [new Required(this.student.MaritalStatus)]),
    ];
  }

  stage2_rules() {
    return [
      new Rules("Country", [new Required(this.student.Country), new MinLength(this.student.Country, 2)]),
      new Rules("Region", [new Required(this.student.Region), new MinLength(this.student.Region, 2)]),
      new Rules("HomeTown", [new Required(this.student.HomeTown), new MinLength(this.student.HomeTown, 2)]),
      new Rules("Address1", [new Required(this.student.Address1), new MinLength(this.student.Address1, 3)]),
      new Rules("Address2", [new Required(this.student.Address1), new MinLength(this.student.Address1, 3)]),
      new Rules("Contact1", [new Required(this.student.Contact1), new MinLength(this.student.Contact1, 10)]),
      new Rules("PersonalEmail", [new Required(this.student.PersonalEmail), new Email(this.student.PersonalEmail)]),
      new Rules("UniversityEmail", [new Email(this.student.UniversityEmail)]),
      new Rules("ResidentialStatus", [new Required(this.student.ResidentialStatus)]),
    ];
  }

  stage3_rules() {
    return [
      new Rules("ProgramId", [new Required(this.student.ProgramId), new MinLength(this.student.ProgramId, 5)]),
      new Rules("ProgramStatus", [new Required(this.student.ProgramStatus), new MinLength(this.student.ProgramStatus, 2)]),
      new Rules("Level", [new Required(this.student.Level), new MinLength(this.student.Level, 3)]),
      new Rules("StudentType", [new Required(this.student.StudentType), new MinLength(this.student.StudentType, 3)]),
      new Rules("EnrolmentOption", [new Required(this.student.EnrolmentOption), new MinLength(this.student.EnrolmentOption, 4)]),
      new Rules("DateOfEntry", [new Required(this.student.DateOfEntry)]),
    ];
  }

  bindData = () => {
    this.student = this.viewModelHelper.addPropertyChangeNotification(this.student);
  };

  save = (rules: Rules[]) => {
    var errors = this.validator.addRules(rules).validate();
    this.viewModelHelper.showErrors(errors);
    if (!this.validator.hasErrors) {
      const options = {
        method: "POST",
        body: JSON.stringify(this.student),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      };

      ;
      fetch(`${App.baseUri}/api/Student/AddStudent`, options)
        .then((res) => res.json())
        .then((res) => {
          ;
          this.student = new Student();
          App.navigate("/app/#studentList");
        });
    }
  };

  validate(route: string, rules: Rules[]) {
    var errors = this.validator.addRules(rules).validate();
    this.viewModelHelper.showErrors(errors);
    if (!this.validator.hasErrors) {
      App.navigate(route);
    }
  }
}
