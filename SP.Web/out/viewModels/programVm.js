var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Validator, Rules, Required, MaxLength, MinNotExceedMax } from "../validator";
import { ViewModelHelper } from "../viewModelHelper";
import { Program } from "../models/program";
import { BindingList2 } from "../BindingList2";
import { Toast } from "../toast/toast";
import { BallLoader } from "../loader/ballLoader";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
export class ProgramViewModel {
    constructor(commonService) {
        this.commonService = commonService;
        this.program = new Program();
        this.departments = [];
        this.programs = [];
        this.students = [];
        this.specialization = [];
        this.creditLimits = [];
        this.progStudents = [];
        this.getDepartments = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield new HttpService().get("Department/GetDepartments");
                this.departments = data.value;
                this.departments.unshift({
                    departmentId: "",
                    name: "Please Select Department",
                    code: "",
                    schoolId: "",
                    schoolName: "",
                    lecturerId: "",
                });
            }
            catch (error) { }
        });
        this.getPrograms = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = this.commonService.programs;
                this.programs = data;
                this.command.execute();
            }
            catch (error) { }
        });
        this.getStudents = () => __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            const data = this.commonService.students;
            this.students = data;
        });
        this.viewModelHelper = new ViewModelHelper();
        this.validator = new Validator();
        this.command = new Command();
    }
    getSpecializations(type) {
        return this.commonService.lookups.filter((x) => x.type === type);
    }
    getSpecialization(name) {
        this.specialization = this.programs.find((x) => x.name === name).specializations;
    }
    getProgram(programName) {
        this.program = this.programs.find((x) => x.name === programName);
        let department = this.departments.find((x) => x.departmentId === this.program.departmentId);
        this.program.department = department.name;
        // let level100 = this.program.creditLimits.find((x) => x.level === "100");
        // this.maxCredit0 = level100.maxCredit;
        // this.minCredit0 = level100.minCredit;
        let level200 = this.program.creditLimits.find((x) => x.level === "200");
        // this.maxCredit1 = level200.maxCredit;
        // this.minCredit1 = level200.minCredit;
        let level300 = this.program.creditLimits.find((x) => x.level === "300");
        // this.maxCredit2 = level300.maxCredit;
        // this.minCredit2 = level300.minCredit;
        let level400 = this.program.creditLimits.find((x) => x.level === "400");
        // this.maxCredit3 = level400.maxCredit;
        // this.minCredit3 = level400.minCredit;
    }
    clearCreditlimits() {
        //this.maxCredit0 = 0;
        // this.maxCredit1 = 0;
        // this.maxCredit2 = 0;
        // this.maxCredit3 = 0;
        //this.minCredit0 = 0;
        // this.minCredit1 = 0;
        // this.minCredit2 = 0;
        // this.minCredit3 = 0;
        this.program = new Program();
        this.bind();
    }
    bindList(id) {
        new BindingList2().bind(this, id);
    }
    bind() {
        this.program = this.viewModelHelper.addPropertyChangeNotification(this.program);
    }
    setupRules() {
        let rules = [];
        for (var i = 0; i < this.program.creditLimits.length; i++) {
            rules.push(new Rules(`minCredit${i}`, [
                new Required(this.program.creditLimits[i].minCredit.toString()),
                new MaxLength(this.program.creditLimits[i].minCredit.toString(), 2),
                new MinNotExceedMax(parseInt(this.program.creditLimits[i].minCredit), parseInt(this.program.creditLimits[i].maxCredit)),
            ]));
            rules.push(new Rules(`maxCredit${i}`, [
                new Required(this.program.creditLimits[i].maxCredit.toString()),
                new MaxLength(this.program.creditLimits[i].maxCredit.toString(), 2),
            ]));
        }
        return [
            new Rules("department", [new Required(this.program.department)]),
            new Rules("name", [new Required(this.program.name)]),
            new Rules("duration", [new Required(this.program.duration.toString())]),
            ...rules,
            //new Rules("maxCredit", [new Required(this.program.maxCredit), new MaxLength(this.program.maxCredit.toString(), 2)]),
        ];
    }
    addSpecialization(data) {
        data.programId = this.program.programId;
        this.program.specializations.push(data);
    }
    addCreditLimit(creditLimit) {
        if (this.program.creditLimits.length < 4) {
            this.program.creditLimits.push(creditLimit);
        }
    }
    removeSpecialization(index) {
        this.program.specializations.splice(index, 1);
    }
    saveProgram() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.program.programId) {
                yield this.update();
            }
            else {
                yield this.save();
            }
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            let rules = this.setupRules();
            var errors = this.validator.addRules(rules).validate();
            this.viewModelHelper.showErrors(errors);
            if (!this.validator.hasErrors) {
                if (!this.program.specializations.find((x) => x.type === "CORE")) {
                    this.program.specializations.push({ name: "GENERAL", type: "CORE", level: "100" });
                    this.program.specializations.push({ name: "GENERAL", type: "CORE", level: "200" });
                    this.program.specializations.push({ name: "GENERAL", type: "CORE", level: "300" });
                    this.program.specializations.push({ name: "GENERAL", type: "CORE", level: "400" });
                }
                let department = this.departments.find((x) => x.name === this.program.department);
                this.program.departmentId = department.departmentId;
                BallLoader.show();
                const res = yield new HttpService().post("Program/AddProgram", this.program);
                this.program = new Program();
                this.bind();
                yield this.getPrograms();
                Toast.success(res.message);
                BallLoader.hide();
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            let rules = this.setupRules();
            var errors = this.validator.addRules(rules).validate();
            this.viewModelHelper.showErrors(errors);
            if (!this.validator.hasErrors) {
                let department = this.departments.find((x) => x.name === this.program.department);
                this.program.departmentId = department.departmentId;
                BallLoader.show();
                for (var c of this.program.creditLimits) {
                    parseInt(c.minCredit);
                    parseInt(c.maxCredit);
                }
                const res = yield new HttpService().post("Program/UpdateProgram", this.program);
                this.program = new Program();
                this.bind();
                yield this.getPrograms();
                Toast.success(res.message);
                BallLoader.hide();
            }
        });
    }
    // Leveldisplay code
    fillTable(prog) {
        let rows = [];
        let progId = this.programs.find((x) => x.name === prog).programId;
        this.progStudents = this.students.filter((x) => x.programId === progId);
        let creditLimit = this.programs.find((x) => x.name === prog).creditLimits;
        for (let i = 0; i < creditLimit.length; i++) {
            let rowdata = [];
            rowdata.push(i + 1);
            rowdata.push(creditLimit[i].level);
            let level = this.progStudents.filter((x) => x.level === creditLimit[i].level);
            rowdata.push(level.length);
            rowdata.push(creditLimit[i].minCredit);
            rowdata.push(creditLimit[i].maxCredit);
            let male = this.progStudents.filter((x) => x.level === creditLimit[i].level && x.gender === "M").length;
            rowdata.push(male);
            let female = this.progStudents.filter((x) => x.level === creditLimit[i].level && x.gender === "F").length;
            rowdata.push(female);
            rows.push(rowdata);
        }
        return rows;
    }
    download_csv(level) {
        let download = [];
        let levelStudents = this.progStudents.filter((x) => x.level === level);
        for (var i = 1; i < levelStudents.length; i++) {
            let data = [];
            data.push(i);
            data.push(levelStudents[i].indexNumber);
            let name = `${levelStudents[i].surname} ${levelStudents[i].othernames}`;
            data.push(name);
            data.push(levelStudents[i].gender);
            data.push(this.prog);
            data.push(levelStudents[i].level);
            data.push(levelStudents[i].enrollmentOption);
            data.push(levelStudents[i].contact1);
            download.push(data);
        }
        var csv = "No.,IndexNumber,Name, Gender, Program,Level,Enrolment Type\n";
        download.forEach(function (row) {
            csv += row.join(",");
            csv += "\n";
        });
        var hiddenElement = document.createElement("a");
        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
        hiddenElement.target = "_blank";
        hiddenElement.download = `${this.prog} ${level}.csv`;
        hiddenElement.click();
    }
}
//# sourceMappingURL=programVm.js.map