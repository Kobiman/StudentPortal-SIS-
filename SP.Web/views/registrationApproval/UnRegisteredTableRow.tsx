import { createElement } from "tsx-create-element";
import { ApproveRegistrationVm } from "../../viewModels/approveRegistrationVm";
import { ApproveRegistrationTableRow } from "./ApproveRegistrationTableRow";

export class UnRegisteredMountedTableRow{
  constructor(private _vm: ApproveRegistrationVm, private indexNumber: string) {
      
    }
     render(registered){
      const doc = document.getElementById("unregisteredMountedCourses");
       doc.textContent = "";
      for (let r of this._vm.mountedCourses) {
      const mountedCourse = registered.find(x=>x.courseCode === r.courseCode);
       if(!mountedCourse){
        let tr: HTMLTableRowElement = (
          <tr>
            <td>{r.courseCode}</td>
            <td>{r.courseName}</td>
            <td>{r.credit}</td>
            <td>{r.category}</td>
            <td>
              <button class="sp-btn sp-btn-default btn-small" button onClick={(evt: Event) => {
                evt.preventDefault();
                let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                this._vm.addMountedCourse(r.courseCode,this.indexNumber);
                row.remove();
                const registeredCourses = this._vm.getRegisteredCourses(this.indexNumber);
                new ApproveRegistrationTableRow(this._vm).render(registeredCourses, this.indexNumber);
                  }}>
               Add
              </button>
            </td>
          </tr>
          );
          doc.appendChild(tr);
       }
    } 
  }
}

export class UnRegisteredTrailTableRow{
  constructor(private _vm: ApproveRegistrationVm,private indexNumber: string) {
    
  }
   render(registered){
    const doc = document.getElementById("unregisteredTrailCourses");
    doc.textContent = "";
    for (let r of this._vm.temporalRegistrationList.find(x=>x.indexNumber===this.indexNumber).trailCourses) {
     const trailCourse = registered.find(x=>x.courseCode === r.courseCode);
     if(!trailCourse){
      let tr: HTMLTableRowElement = (
        <tr>
          <td>{r.courseCode}</td>
          <td>{r.courseName}</td>
          <td>{r.credit}</td>
          <td>{r.category}</td>
          <td>
            <button class="sp-btn sp-btn-default btn-small" button onClick={(evt: Event) => {
                  evt.preventDefault();
                  let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                  this._vm.addTrailCourse(r.courseCode,this.indexNumber);
                  row.remove();
                  const registeredCourses = this._vm.getRegisteredCourses(this.indexNumber);
                  new ApproveRegistrationTableRow(this._vm).render(registeredCourses,this.indexNumber);
                }}>
             Add
            </button>
          </td>
        </tr>
        );
        doc.appendChild(tr);
     }
  } 
}
}