var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Validator, Rules, Required, Email } from "../validator";
import { ViewModelHelper } from "../viewModelHelper";
import { Lecturer } from "../models/lecturer";
import { BindingList2 } from "../BindingList2";
import { BallLoader } from "../loader/ballLoader";
import { Toast } from "../toast/toast";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
export class LecturerVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.lecturer = new Lecturer();
        this.departments = [];
        this.lecturers = [];
        this.querys = [];
        this.results = [];
        this.getDepartments = () => __awaiter(this, void 0, void 0, function* () {
            try {
                BallLoader.show();
                this.departments = this.commonService.departments;
                new BindingList2().bindCollection(this);
                BallLoader.hide();
                this.departments.unshift({
                    departmentId: "",
                    name: "Please Select Department",
                    code: "",
                    schoolId: "",
                    schoolName: "",
                    lecturerId: "",
                });
                this.bindList("departments");
            }
            catch (error) { }
        });
        this.getLecturers = () => __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            const data = this.commonService.lecturers;
            this.results = data;
            this.lecturers = data;
            this.lecturers.forEach((lecture) => {
                if (lecture.departmentId.length > 0) {
                    lecture.departmentName = this.commonService.departments.find((x) => x.departmentId === lecture.departmentId).name;
                }
            });
            BallLoader.hide();
        });
        this.viewModelHelper = new ViewModelHelper();
        this.validator = new Validator();
        this.lecturerChangedCommand = new Command();
    }
    setupRules() {
        return [
            new Rules("name", [new Required(this.lecturer.name)]),
            new Rules("department", [new Required(this.lecturer.department)]),
            new Rules("staffId", [new Required(this.lecturer.staffId)]),
            new Rules("telephone", [new Required(this.lecturer.telephone)]),
            new Rules("email", [
                new Required(this.lecturer.email),
                new Email(this.lecturer.email),
            ]),
            new Rules("address", [new Required(this.lecturer.address)]),
        ];
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            let rules = this.setupRules();
            var errors = this.validator.addRules(rules).validate();
            this.viewModelHelper.showErrors(errors);
            if (!this.validator.hasErrors) {
                let department = this.departments.find((x) => x.name === this.lecturer.department);
                this.lecturer.departmentId = department.departmentId;
                BallLoader.show();
                const res = yield new HttpService().post("Lecturer/AddLecturer", this.lecturer);
                this.lecturer = new Lecturer();
                this.bind();
                yield this.getLecturers();
                Toast.success(res.message);
                BallLoader.hide();
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            // let rules = this.setupRules();
            // var errors = this.validator.addRules(rules).validate();
            // this.viewModelHelper.showErrors(errors);
            // if (!this.validator.hasErrors) {
            let lecturer = this.lecturers.find((x) => x.staffId === this.staffId);
            let request = {
                lecturerId: lecturer.lecturerId,
                staffId: lecturer.staffId,
                name: lecturer.name,
                telephone: lecturer.telephone,
                email: lecturer.email,
                address: lecturer.address,
                departmentId: lecturer.departmentId,
                status: this.lectStatus,
            };
            this.lecturer.status = this.lectStatus;
            BallLoader.show();
            const res = yield new HttpService().post("Lecturer/UpdateLecturer", request);
            this.lecturer = new Lecturer();
            yield this.getLecturers();
            Toast.success(res.message);
            BallLoader.hide();
            // }
        });
    }
    bindList(id) {
        new BindingList2().bind(this, id);
    }
    bind() {
        this.lecturer = this.viewModelHelper.addPropertyChangeNotification(this.lecturer);
    }
    search() {
        this.results = this.lecturers.filter((a) => this.executeQuery(a, this.querys));
        new BindingList2().bindCollection(this.results);
        //document.getElementsByName("countLecturer()")
        this.lecturerChangedCommand.execute();
    }
    IsEqualTo(source, propertyName, parameter) {
        return source[propertyName] === parameter;
    }
    buidQuery(propertyName, parameter) {
        var item = this.querys.find((x) => x.propertyName === propertyName);
        if (item != null) {
            var index = this.querys.indexOf(item);
            this.querys.splice(index, 1);
        }
        if (parameter != "") {
            this.querys.push({ propertyName: propertyName, parameter: parameter });
        }
        this.search();
    }
    executeQuery(source, querys) {
        var result = true;
        for (var query of querys) {
            result =
                result && this.IsEqualTo(source, query.propertyName, query.parameter);
        }
        return result;
    }
    download_csv() {
        let download = [];
        for (var i = 1; i < this.results.length; i++) {
            let data = [];
            data.push(i);
            data.push(this.results[i].name);
            data.push(this.results[i].staffId);
            let department = this.departments.find((x) => x.departmentId === this.results[i].departmentId).name;
            data.push(department);
            data.push(this.results[i].telephone);
            data.push(this.results[i].email);
            data.push(this.results[i].address);
            download.push(data);
        }
        var csv = "No.,Name, Staff ID, Department,Telephone,Email,Address Type\n";
        download.forEach(function (row) {
            csv += row.join(",");
            csv += "\n";
        });
        var hiddenElement = document.createElement("a");
        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
        hiddenElement.target = "_blank";
        hiddenElement.download = `lecturers.csv`;
        hiddenElement.click();
    }
}
//# sourceMappingURL=lecturerVm.js.map