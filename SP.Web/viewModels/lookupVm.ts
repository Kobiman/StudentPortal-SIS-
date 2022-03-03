import { Validator, Rules, Required, MinLength } from "../validator";
import { ViewModelHelper } from "../viewModelHelper";
import { Lookup } from "../models/lookup";
import { Institution } from "../models/institution";
import { BindingList2 } from "../BindingList2";
import { App } from "../app";
import { Toast } from "../toast/toast";
import { BallLoader } from "../loader/ballLoader";
import { HttpService } from "../services/httpService";
import { CommonService } from "../services/commonService";
import { LookupView } from "../views/lookUp/lookupView";

export class LookupVm {
  validator: Validator;
  viewModelHelper: ViewModelHelper;
  lookup: Lookup = new Lookup();
  institutions: Institution[] = [];
  lookups: Lookup[] = [];
  lookupTypes: any[] = [
    { name: "" },
    { name: "ENROLLMENT OPTION" },
    { name: "COURSE CATEGORY" },
    { name: "LEVEL" },
    { name: "SEMESTER" },
    { name: "ACADEMIC YEAR" },
    { name: "SPECIALIZATION" },
    { name: "GRADE TYPE" },
    { name: "CONTROL TYPE" },
  ];

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.validator = new Validator();
  }

  setupRules() {
    return [
      new Rules("name", [new Required(this.lookup.name)]),
      new Rules("type", [new Required(this.lookup.type)]),
      new Rules("institution", [new Required(this.lookup.institution)]),
    ];
  }

  async save() {
    let rules = this.setupRules();
    var errors = this.validator.addRules(rules).validate();
    this.viewModelHelper.showErrors(errors);
    if (!this.validator.hasErrors) {
      let institution = this.institutions.find(
        (x) => x.name === this.lookup.institution
      );
      this.lookup.institution = institution.institutionId;
      BallLoader.show();
      const res = await new HttpService().post("Lookup/AddLookup", this.lookup);
      this.lookup = new Lookup();
      this.bind();
      this.getLookups();
      new LookupView(this).render("route-outlet");
      Toast.success(res.message);
      BallLoader.hide();
    }
  }

  getInstitutions = async () => {
    try {
      const data = await new HttpService().get("Institution/GetInstitutions");
      this.institutions = data.value;
      var institution = new Institution();
      institution.name = "Please Select Institution";
      this.institutions.unshift(institution);
      this.bindList("institutions");
    } catch (error) {}
  };

  getLookups = async () => {
    try {
      //const data = await new HttpService().get("Lookup/GetLookups");
      this.lookups = this.commonService.lookups;
      // new BindingList2().bind(this, "lookups");
    } catch (error) {}
  };

  bindList(id: string) {
    new BindingList2().bind(this, id);
  }

  bind() {
    this.lookup = this.viewModelHelper.addPropertyChangeNotification(
      this.lookup
    );
  }
}
