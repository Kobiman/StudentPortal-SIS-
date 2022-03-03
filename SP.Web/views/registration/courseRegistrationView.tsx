import { IView } from "../../IView";
import { CourseRegistrationVm } from "../../viewModels/courseRegistrationVm";
import { App } from "../../app";

export class CourseRegistrationView implements IView {
  constructor(private _vm: CourseRegistrationVm) {}
  async oninitialized(): Promise<void> {
    
  }
  render(elementId: string): void {
    this._vm.setElementId(elementId);

    if(this._vm._courseRegistrationService.hasRegisterd){
         App.navigate("/app/#registeredCourses");
    }else{
        App.navigate("/app/#registerCourses");
    }
  }
}
