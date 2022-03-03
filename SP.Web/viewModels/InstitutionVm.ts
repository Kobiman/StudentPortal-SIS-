import { Institution } from "../models/institution";
import { ViewModelHelper } from "../viewModelHelper";
import { Rules, Required, MinLength, Validator, Email } from "../validator";
import { BindingList2 } from "../BindingList2";
import { BallLoader } from "../loader/ballLoader";
import { AppChannel } from "../appChannel";
import { Constants } from "../constants";
import { Toast } from "../toast/toast";
import { App } from "../app";
import { HttpService } from "../services/httpService";

export class InstitutionVm {
  viewModelHelper: ViewModelHelper;
  validator: Validator;
  institution: Institution = new Institution();
  institutions: Institution[] = [];
  code: any;

  constructor() {
    this.viewModelHelper = new ViewModelHelper();
    this.validator = new Validator();
    this.getInstitutions();
  }

  setupRules() {
    return [
      new Rules("name", [new Required(this.institution.name), new MinLength(this.institution.name, 2)]),
      new Rules("city", [new Required(this.institution.city)]),
      new Rules("code", [new Required(this.institution.code)]),
      new Rules("country", [new Required(this.institution.country)]),
      new Rules("email", [new Required(this.institution.email), new Email(this.institution.email)]),
      new Rules("telephone", [new Required(this.institution.telephone)]),
      new Rules("postalAddress", [new Required(this.institution.postalAddress)]),
    ];
  }

  bind() {
    this.institution = this.viewModelHelper.addPropertyChangeNotification(this.institution);
  }

 async save() {
    let rules = this.setupRules();
    var errors = this.validator.addRules(rules).validate();
    this.viewModelHelper.showErrors(errors);
      BallLoader.show();
      const res = await new HttpService().post("Institution/AddInstitution", this.institution);
          this.institution = new Institution();
          this.bind();
          await this.getInstitutions();
          Toast.success(res.message);
          BallLoader.hide();
          let frm = document.getElementsByTagName("form")[0] as HTMLFormElement;
          frm.reset();
 }

  getInstitutions = async () => {
    try {
      const data = await new HttpService().get("Institution/GetInstitutions");
      this.institutions = data.value;
      this.bindList("institutions");
    } catch (error) {}
  };

  getInstitutionDetails = async () => {
    BallLoader.show();
    this.institution=this.institutions.find((x)=>x.code===this.code)
    BallLoader.hide();
    return this.institution;
  }

  bindList(id: string) {
    new BindingList2().bind(this, id);
  }

  EnableTextBox() {
      let input = document.querySelectorAll("[input]");
      input.forEach(function (item) {
      item.toggleAttribute("disabled");
    })  
  }
  
  DisableTextBox() {
    document.getElementById("btnEdit").style.visibility="visible";
    let input = document.querySelectorAll("[input]");
    input.forEach(function (item) {          
      item.toggleAttribute("disabled");
    })
  }
}
