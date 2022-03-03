import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { ResultsAmmendmentVm } from "../../viewModels/resultsAmmendmentVm";
import { UserAccountVm } from "../../viewModels/userAccountVm";

export class UserAccountView implements IView {
  constructor(private _vm: UserAccountVm) {}
  async oninitialized(): Promise<void> {}
  render = async (elementId: string) => {
    let temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>User Account setting</h1>
          <div class="mountcourses-form">
            <div class="ammendment-header"></div>
          </div>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);
  };
}
