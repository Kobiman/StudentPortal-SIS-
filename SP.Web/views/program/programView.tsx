import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { ProgramModal } from "./programModal";
import { ProgramViewModel } from "../../viewModels/programVm";
import { _ } from "../../group";
import { ProgramTableRow } from "./programRowTable";
import { ProgramTableHead } from "./programHeadTable";
import { SpecializationTable, SpecializationTableHead } from "./specializationTable";

export class ProgramView implements IView {

  name: any;
  constructor(private _vm: ProgramViewModel) {
    this._vm.command.add(()=>{
      this.render("route-outlet");
    });
  }
  async oninitialized(): Promise<void> {
    await this._vm.getDepartments();
    await this._vm.getPrograms();
    await this._vm.getStudents();
  }
  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Program List</h1>
          <div class="mountcourses-form">
            <div class="sp-btn-row">
              <button class="sp-btn sp-btn-default btn-small" id="addProgram" style="float:right" onClick={(evt: Event) => {
                                evt.preventDefault();
                                new ProgramModal(this._vm).render("route-outlet");
                            }}>
                Add
              </button>
            </div>
            <div>
              <table class="table-hd" id="programViewHead">
                <thead>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Duration</th>
                  <th></th>
                </thead>
              </table>
              <div class="horizontal-program">
                <table class="table css-serial" id="programView">
                  <thead hidden>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Duration</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  {
                    this._vm.programs.map(x=>
                  <tbody id="programs" data-repeat="programs">
                        <tr>
                          <td></td>
                          <td>{x.name}</td>
                          <td>{x.duration}</td>
                          <td><button class="sp-btn td-btn"
                            onClick={(evt: Event) => {
                              evt.preventDefault();
                              let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                                const programName = row.cells[1].innerText;
                              this._vm.getProgram(programName);
                              new ProgramModal(this._vm).render("route-outlet");
                            }}
                        >
                        <i class="fas fa-edit"> </i>
                        Edit
                      </button>  </td>
                    </tr>
                  </tbody>
                  )
                }
                </table>
              </div>
              <div>
                <div class="">
                  <div class="sp-row-col-program">
                    <div class="specialization-info">
                      <h3 class="edit-specialization-header" id="programName" style="visibility:hidden">{`Specializations: ${this._vm.prog}`}</h3>
                      <div class="specialization-view">
                        <table id="specializationsTable" class="table edit-table">
                          <thead id="specializationsHead">             
                          </thead>
                
                          <tbody id="specializationsBody">
                          </tbody> 
                        </table>
                      </div>
                      <div class="left-profile-edit">                       
                      </div>   
                </div>
              <div clas="profile-fields">             
                    <div class="horizontal-edit-dept">
                       <table class="table edit-table">
                          <thead id="generateHead">
                            
                          </thead>
                          <tbody id="statistics">
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);
    this.addClickEvent();

     _.syncTable("programViewHead", "programView");
  }

   addClickEvent = async () => {
      let showDetails = async (evt: Event) => {
        evt.preventDefault();
        let row = (evt.target as HTMLButtonElement).parentElement as HTMLTableRowElement;
        
        if(row.cells){
          const name = row.cells[1].innerText;
          this._vm.prog = name;
          await this._vm.getSpecialization(name);
          new ProgramTableHead(this._vm).render();
          new ProgramTableRow(this._vm).render();
          new SpecializationTableHead(this._vm).render();
          new SpecializationTable(this._vm).render();
          document.getElementById("programName").style.visibility="visible";
        }
      };

      const elements = document.querySelectorAll("td");
      elements.forEach(function (element) {
        (element as HTMLElement).onclick = showDetails;
      });
    }
}
