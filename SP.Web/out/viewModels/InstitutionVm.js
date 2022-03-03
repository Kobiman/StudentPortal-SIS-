var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Institution } from "../models/institution";
import { ViewModelHelper } from "../viewModelHelper";
import { Rules, Required, MinLength, Validator, Email } from "../validator";
import { BindingList2 } from "../BindingList2";
import { BallLoader } from "../loader/ballLoader";
import { Toast } from "../toast/toast";
import { HttpService } from "../services/httpService";
export class InstitutionVm {
    constructor() {
        this.institution = new Institution();
        this.institutions = [];
        this.getInstitutions = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield new HttpService().get("Institution/GetInstitutions");
                this.institutions = data.value;
                this.bindList("institutions");
            }
            catch (error) { }
        });
        this.getInstitutionDetails = () => __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            this.institution = this.institutions.find((x) => x.code === this.code);
            BallLoader.hide();
            return this.institution;
        });
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
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            let rules = this.setupRules();
            var errors = this.validator.addRules(rules).validate();
            this.viewModelHelper.showErrors(errors);
            BallLoader.show();
            const res = yield new HttpService().post("Institution/AddInstitution", this.institution);
            this.institution = new Institution();
            this.bind();
            yield this.getInstitutions();
            Toast.success(res.message);
            BallLoader.hide();
            let frm = document.getElementsByTagName("form")[0];
            frm.reset();
        });
    }
    bindList(id) {
        new BindingList2().bind(this, id);
    }
    EnableTextBox() {
        let input = document.querySelectorAll("[input]");
        input.forEach(function (item) {
            item.toggleAttribute("disabled");
        });
    }
    DisableTextBox() {
        document.getElementById("btnEdit").style.visibility = "visible";
        let input = document.querySelectorAll("[input]");
        input.forEach(function (item) {
            item.toggleAttribute("disabled");
        });
    }
}
//# sourceMappingURL=InstitutionVm.js.map