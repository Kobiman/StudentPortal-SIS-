import { Command } from "../Command";
export class CourseRegistrationVm {
    constructor(courseRegistrationService) {
        this.courseRegistrationService = courseRegistrationService;
        this.hasRegisterd = false;
        this.mountedCourses = [];
        this.event = new Command();
        this._courseRegistrationService = courseRegistrationService;
    }
    setElementId(elementId) {
        this.elementId = elementId;
    }
}
//# sourceMappingURL=courseRegistrationVm.js.map