import { createElement } from "tsx-create-element";
import { CustomRenderer } from "../../customRenderer";
import { IView } from "../../IView";
import { ControlsVm } from "../../viewModels/controlsVm";
import { AddControlModal } from "./controlModal";

export class ControlsView implements IView {
  constructor(private _vm: ControlsVm) {}
  async oninitialized(): Promise<void> {
  }

  render(elementId: string) {
    let temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Controls</h1>
            <button class="sp-btn sp-btn-primary" id="addControl" onClick={(evt: Event) => {
                evt.preventDefault();
                new AddControlModal(this._vm).render("route-outlet");
            }}>
            <i class="fas fa-plus" style="margin-right:5px;color:#eee"></i>
              Add
            </button>
          <div class="">
            <div class="">
              <button class="sp-btn sp-btn-default" id="controlAllButton" 
                style="color:#8B0000"
                onClick={async(evt: Event) => {
                  evt.preventDefault();
                  await this._vm.updateControls(true);
                  this._vm.setControlType();
                  CustomRenderer.renderElements("controlBody", new ControlsTr(this._vm).create()); 
            }}>
              TURN ON
              </button>
            </div>
            <div class="">
              <button class="sp-btn sp-btn-default" id="controlAllButton" 
                onClick={async(evt: Event) => {
                  evt.preventDefault();
                  await this._vm.updateControls(false);
                  this._vm.setControlType();
                  CustomRenderer.renderElements("controlBody", new ControlsTr(this._vm).create()); 
            }}>
              TURN OFF
              </button>
              </div>
            <div class="control-filter">
              <div class="">
              <select class="control-text-field" id="type" style="height:37px;visibility:hidden;" filter>
                <option value="">CONTROL TYPE</option>
                {this._vm.getControlType().map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
                </select>
              </div>
              <div class="">
              <select class="control-text-field" id="academicYear" style="height:37px;" academicYear>
                <option value="">ACADEMIC YEAR</option>
                {this._vm.getAcademicYear().map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
                </select>
              </div>
            </div>
          </div>
          <div class="">
            <div class="control-horizontal">
              <table class="table css-serial" id="controlHead">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Program</th>
                    <th>Type</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody id="controlBody" >
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    let getType = async (evt: Event) => {
      evt.preventDefault();
      const element = document.querySelector("[filter]");
      let control = (element as HTMLSelectElement).value;
      this._vm.controlType=control;
      this._vm.setControlType();
      CustomRenderer.renderElements("controlBody", new ControlsTr(this._vm).create());      
    };

    document.getElementById("type").onchange = getType;
      let getAcademicYear = async (evt: Event) => {
        evt.preventDefault();
        const element = document.querySelector("[academicYear]");
        let academicYear = (element as HTMLSelectElement).value;
        this._vm.getControls(academicYear);
        document.getElementById("type").style.visibility ="visible";
        CustomRenderer.renderElements("controlBody",new ControlsTr(this._vm).create()) ;
      };
      document.getElementById("academicYear").onchange = getAcademicYear;
  }
}


export class StatusButton {
  constructor(private _vm: ControlsVm) {}
  create(status: any) {
    let btnText = status.active ? "On" : "Off";
    let btnColor = status.active ? "#59b379" : "#8B0000";
    let btn = (
      <button
        class="sp-btn sp-btn-default btn-small"
        id="turn"
        style="border:none;text-align: start;margin-left: -2px;"
        onClick={(evt: Event) => {
          evt.preventDefault();
          let row = (evt.target as HTMLButtonElement).parentElement
            .parentElement as HTMLTableRowElement;
          debugger
          if (row.textContent.indexOf("On") != -1) {
            status.active = false;
            this._vm.updateControl(status.programId,status.controlType,status.active,status.id);
            (row.cells[3].children[0] as any).style.color = "#8B0000";
            (row.cells[3].children[0] as any).innerText = "Off";
          } else {
            status.active = true;
            this._vm.updateControl(status.programId,status.controlType,status.active,status.id);
            (row.cells[3].children[0] as any).style.color = "#59b379";
            (row.cells[3].children[0] as any).innerText = "On";
          }
        }}
      >
        {btnText}
      </button>
    );
    btn.style.color = btnColor;
    return btn;
  }
}

export class ControlsTr {
  constructor(private _vm: ControlsVm) {}
  create() {
    return this._vm.programs.map((x) => (
      <tr>
        <td width="5.1%"></td>
        <td width="15.7%">{x.name}</td>
        <td width="15.7%">{x.controlType}</td>
        <td width="9%">{new StatusButton(this._vm).create(x)}</td>
      </tr>
    ));
  }
}

