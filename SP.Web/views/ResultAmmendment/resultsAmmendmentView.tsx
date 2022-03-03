import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { ResultsAmmendmentVm } from "../../viewModels/resultsAmmendmentVm";
import { ResultsAmmendmentModal } from "./resultAmmendmentModal";
export class ResultsAmmendmentView implements IView {
  
  constructor(private _vm: ResultsAmmendmentVm) { 
  }
  async oninitialized(): Promise<void> {
  }
  render = async (elementId: string) => {
    
    let temp = (
        <div class="sp-box">
        <div class="mc-row">
          <h1>Result Ammendment</h1>
          <div class="mountcourses-form">
            <div class="ammendment-header">
              <div id="permissionSearch">
                <input type="text" placeholder="Enter Index Number." autofocus onkeyup={() => {                      
                }} id="searchByIndex"/>
              </div>
              <div id="permissionSearch">
                <input type="text" placeholder="Enter Course Code." autofocus onkeyup={() => {                      
                }} id="searchByCode"/>
              </div>
              <div>
                <button class="sp-btn sp-btn-default " id="submit" onClick={async (evt: Event) => {
                  debugger
                    evt.preventDefault();
                    new ResultsAmmendmentModal(this._vm).render("route-outlet");
                    }}>
                  Submit
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>

    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    
  }
}