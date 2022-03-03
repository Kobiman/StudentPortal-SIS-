import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { ApproveRegistrationVm } from "../../viewModels/approveRegistrationVm";
import { UnRegisteredMountedTableRow, UnRegisteredTrailTableRow} from "./UnRegisteredTableRow";

export class ApproveRegistrationTableRow {
    constructor(private _vm: ApproveRegistrationVm) {
      
  }

     render(registerdCourses,indexNumber){
       const doc = document.getElementById("approveRegistrationRow");
      doc.textContent = "";
     for (let r of registerdCourses) {
       if (r.category.toUpperCase()==="CORE"){
        let tr: HTMLTableRowElement = (
          <tr>
            <td>{r.courseCode}</td>
            <td>{r.courseName}</td>
            <td>{r.credit}</td>
            <td>{r.category}</td>
            <td></td>
            <td>
              <button class="sp-btn sp-btn-default btn-small" button onClick={async(evt: Event) => {
                      evt.preventDefault();
                      this._vm.removeCourse(r.courseCode,indexNumber);
                      let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                      const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                new UnRegisteredMountedTableRow(this._vm, indexNumber).render(registeredCourses);
                new UnRegisteredTrailTableRow(this._vm,indexNumber).render(registeredCourses);
                      row.remove();
                    }}> 
                Defer
              </button>
            </td>
          </tr>
          );
          doc.appendChild(tr);
       }else if (r.category.toUpperCase()==="ELECTIVE"){
        let tr: HTMLTableRowElement = (
          <tr>
            <td>{r.courseCode}</td>
            <td>{r.courseName}</td>
            <td>{r.credit}</td>
            <td>{r.category}</td>
            <td>
              <button class="sp-btn sp-btn-default btn-small" button onClick={async(evt: Event) => {
                evt.preventDefault();
                this._vm.removeCourse(r.courseCode,indexNumber);
                let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                new UnRegisteredMountedTableRow(this._vm, indexNumber).render(registeredCourses);
                new UnRegisteredTrailTableRow(this._vm,indexNumber).render(registeredCourses);
                  row.remove();
                }}> 
                Remove 
              </button>
            </td>
            <td>
              <button class="sp-btn sp-btn-default btn-small" button onClick={async(evt: Event) => {
                evt.preventDefault();
                this._vm.removeCourse(r.courseCode,indexNumber);
                let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                new UnRegisteredMountedTableRow(this._vm, indexNumber).render(registeredCourses);
                new UnRegisteredTrailTableRow(this._vm,indexNumber).render(registeredCourses);
                  row.remove();
                }}> 
                Defer
              </button>
            </td>
          </tr>
          );
          doc.appendChild(tr);
       }else{
        let tr: HTMLTableRowElement = (
          <tr>
            <td>{r.courseCode}</td>
            <td>{r.courseName}</td>
            <td>{r.credit}</td>
            <td>{r.category}</td>
            <td>
              <button class="sp-btn sp-btn-default btn-small" button onClick={async(evt: Event) => {
                evt.preventDefault();
                this._vm.removeCourse(r.courseCode,indexNumber);
                let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                new UnRegisteredMountedTableRow(this._vm, indexNumber).render(registeredCourses);
                new UnRegisteredTrailTableRow(this._vm,indexNumber).render(registeredCourses);
                  row.remove();
                }}> 
                Remove 
              </button>
            </td>
            <td>
            </td>
          </tr>
          );
          doc.appendChild(tr);
       }
       } 
     }
  }