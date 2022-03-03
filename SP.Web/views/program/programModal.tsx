import { IView } from "../../IView";
import { ProgramViewModel } from "../../viewModels/programVm";
import { createElement } from "tsx-create-element";


export class ProgramModal implements IView {
  constructor(private _vm: ProgramViewModel) {}
  async oninitialized(): Promise<void> {
  }
  render(elementId: string): void {
    const temp = (
      <div class="mountcourse-modal" id="modal">
        <div class="modal-content">
          <div class="sp-box">
            <div class="sp-row">
              <h1>Program</h1>
              <div class="mountcourses-form">
                <p id="gradeModalTextEdit">
                  <label>Department</label>
                  <select id="department" binding="Program.department" class="edit-text-field" value={this._vm.program.department}>
                    {
                      this._vm.departments.map(x=>
                        <option binding="name">{x.name}</option>)
                    }
                  </select>
                  <div errors="department"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Name</label>
                  <input binding="Program.name" type="text" placeholder="Program Name" class="edit-text-field" style="margin-top: 1%;width:-webkit-fill-available" value={this._vm.program.name} />
                  <div errors="name"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Duration</label>
                  <input binding="Program.duration" type="text" placeholder="Duration" class="edit-text-field" style="margin-top: 1%;width:-webkit-fill-available" value={this._vm.program.duration}/>
                  <div errors="duration"></div>
                </p>
                 {new CreditLimitView(this._vm).create()}
                <p>
                  <button class="sp-btn sp-btn-default btn-small" id="Add">
                    Add
                  </button>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Specialization</label>
                </p>
                <p id="specialization">
                  <div class="mc-table"  style="overflow-y:scroll; max-height:190px">
                    <table class="table">
                      <tbody id="specializations"></tbody>
                    </table>
                  </div>
                </p>
                <div class="sp-btn-row">
                  <button id="Save" class="sp-btn sp-btn-primary">
                    Save
                  </button>
                  <button class="sp-btn sp-btn-default" id="close">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    let addSpecialization = () => {
      new SpecializationView(this._vm,null).render("specializations");
      var rows = (document.getElementById("specializations") as HTMLTableElement).rows;

      let sp = {
        name: "",
        type: "",
        level: "",
      };
      let elements = rows[rows.length - 1].querySelectorAll("[binding]");
      sp = this._vm.viewModelHelper.notificationPropertyChange(sp, elements);
      this._vm.addSpecialization(sp);

      (rows[rows.length - 1].querySelectorAll("[click]")[0] as HTMLButtonElement).onclick = removeRow;
    };

    let removeRow = (evt: Event) => {
      evt.preventDefault();
      let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
      if ((document.getElementById("specializations") as HTMLTableElement).rows.length > 1) {
        (document.getElementById("specializations") as HTMLTableElement).deleteRow(row.rowIndex);
        this._vm.removeSpecialization(row.rowIndex);
      }
    };

    const doc = document.getElementById(elementId);
    doc.appendChild(temp);

    var rows = (document.getElementById("creditLimits") as HTMLParagraphElement).children;
    let maxCredit = rows[1] as HTMLDivElement;
    let minCredit = rows[2] as HTMLDivElement;
     for(var i = 0; i < maxCredit.children.length; i++){
      let creditLimit:any = {};
      
      creditLimit = this._vm.program.creditLimits.find((x) => x.level === `${(100*(i+1))}`);
      if(creditLimit){
       (maxCredit.children[i].children[1] as HTMLInputElement).value = creditLimit.maxCredit;
       (minCredit.children[i].children[0] as HTMLInputElement).value = creditLimit.minCredit;
      }
      else{
        creditLimit = {
          maxCredit: 0,
          minCredit: 0,
          level: (100*(i+1)).toString(),
        };  
      }

      let elements = maxCredit.children[i].querySelectorAll("[binding]");
      let elements2 = minCredit.children[i].querySelectorAll("[binding]");
      creditLimit = this._vm.viewModelHelper.notificationPropertyChange(creditLimit, elements);
      creditLimit = this._vm.viewModelHelper.notificationPropertyChange(creditLimit, elements2);
      this._vm.addCreditLimit(creditLimit);
     }
    
     if(this._vm.program.specializations.length == 0){
       addSpecialization();
     }
     else{
       for(var sp of this._vm.program.specializations){
          new SpecializationView(this._vm,sp).render("specializations");
          let rows = (document.getElementById("specializations") as HTMLTableElement).rows;
          let elements = rows[rows.length - 1].querySelectorAll("[binding]");
          (elements[1] as HTMLSelectElement).value = sp.type;
          (elements[5] as HTMLSelectElement).value = sp.level;
          sp = this._vm.viewModelHelper.notificationPropertyChange(sp, elements);
          (rows[rows.length - 1].querySelectorAll("[click]")[0] as HTMLButtonElement).onclick = removeRow;
       }
       let department = (document.getElementById("department") as HTMLSelectElement);
       department.setAttribute("disabled","true");
       department.value = this._vm.program.department;
     }
    

    let save = async (evt: Event) => {
      evt.preventDefault();
      await this._vm.saveProgram();

      if (!this._vm.validator.hasErrors) {
        let tr = document.getElementById("programs");
        tr.textContent = "";
        tr.appendChild(
          <tr>
            <td binding="name"></td>
            <td binding="duration"></td>
            <td binding="specializations"></td>
          </tr>
        );

        doc.removeChild(temp);
      }
    };

    let hideModal = async (evt: Event) => {
      evt.preventDefault();
      doc.removeChild(temp);
      this._vm.clearCreditlimits();
    };

    let add = async (evt: Event) => {
      evt.preventDefault();
      addSpecialization();
    };

    this._vm.bind();
    document.getElementById("close").onclick = hideModal;
    document.getElementById("Save").onclick = save;
    document.getElementById("Add").onclick = add;
  }
}

export class SpecializationView implements IView {
  constructor(private _vm: ProgramViewModel,private sp:any) {}
  async oninitialized(): Promise<void> {
  }
  render(elementId: string): void {
    let temp:any = "";
    if(this.sp === null){
      (
       temp = <tr>
          <td>
            <input binding="name" type="text" placeholder="Name" class="edit-text-field" style="margin-bottom: 0px;" />
          </td>
          <td>
            <select binding="type" class="edit-text-field" style="margin-bottom: 0px;" >
               <option binding="name">Type</option>
              {
                this._vm.getSpecializations("SPECIALIZATION").map(x=>
                      <option binding="name">{x.name}</option>
                )
              }
            </select>
          </td>
          <td>
            <select binding="level" class="edit-text-field" style="margin-bottom: 0px;">
            <option binding="name">Level</option>
              {
                this._vm.getSpecializations("LEVEL").map(x=>
                      <option binding="level">{x.name}</option>
                )
              }
            </select>
          </td>
          <td>
            <button class="sp-btn sp-btn-default btn-small" click="">
              DEL
            </button>
          </td>
        </tr>
      )
    }
    else{
     temp = (
        <tr>
          <td>
            <input binding="name" type="text" placeholder="Name" style="margin-bottom: 0px;" value={this.sp.name}/>
          </td>
          <td>
            <select binding="type" style="margin-bottom: 0px;">
              {
                this._vm.getSpecializations("SPECIALIZATION").map(x=>
                      <option binding="name">{x.name}</option>
                )
              }
            </select>
          </td>
          <td>
            <select binding="level" style="margin-bottom: 0px;">
              {
                this._vm.getSpecializations("LEVEL").map(x=>
                      <option binding="name">{x.name}</option>
                )
              }
            </select>
          </td>
          <td>
            <button class="sp-btn sp-btn-default btn-small" click="">
              DEL
            </button>
          </td>
        </tr>
      )
    }

    const doc = document.getElementById(elementId);
    doc.appendChild(temp);
  }
}

export class CreditLimitView{
  constructor(private _vm: ProgramViewModel) {    
  }
   create(){
    return(
      <p id="creditLimits">
        <label id="gradeModalTextEdit" >Set Credit Limits</label>
        <div class = "sp-row-col-4">
           <p id="gradeModalTextEdit">
           <label>Level 100</label>
             <input binding="maxCredit" type="number" class="edit-text-field" placeholder="Max" style="margin-bottom: 4%;height: 37%;"/>
             <div errors="maxCredit0"></div>
           </p>
           <p id="gradeModalTextEdit">
           <label>Level 200</label>
             <input binding="maxCredit" type="number" class="edit-text-field" placeholder="Max" style="margin-bottom: 4%;height: 37%;"/>
             <div errors="maxCredit1"></div>
           </p>
           <p id="gradeModalTextEdit">
           <label>Level 300</label>
             <input binding="maxCredit" type="number" class="edit-text-field" placeholder="Max" style="margin-bottom: 4%;height: 37%;"/>
             <div errors="maxCredit2"></div>
           </p>
           <p id="gradeModalTextEdit"> 
           <label>Level 400</label>
             <input binding="maxCredit" type="number" class="edit-text-field" placeholder="Max" style="margin-bottom: 4%;height: 37%;"/>
             <div errors="maxCredit3"></div>
           </p>
        </div>
        <div class = "sp-row-col-4">
           <p id="gradeModalTextEdit">
             <input binding="minCredit" type="number" class="edit-text-field" placeholder="Min" style="width: 95%"/>
             <div errors="minCredit0"></div>
           </p>
           <p id="gradeModalTextEdit">
             <input binding="minCredit" type="number" class="edit-text-field" placeholder="Min" style="width: 95%"/>
             <div errors="minCredit1"></div>
           </p>
           <p id="gradeModalTextEdit">
             <input binding="minCredit" type="number" class="edit-text-field" placeholder="Min" style="width: 95%"/>
             <div errors="minCredit2"></div>
           </p>
           <p id="gradeModalTextEdit">
             <input binding="minCredit" type="number" class="edit-text-field" placeholder="Min" style="width: 95%"/>
             <div errors="minCredit3"></div>
           </p>
        </div>
      </p>
    );
  }
}
