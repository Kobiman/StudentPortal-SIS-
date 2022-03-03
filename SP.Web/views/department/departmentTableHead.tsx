import { createElement } from "tsx-create-element";
import { DepartmentVm } from "../../viewModels/departmentVm";

export class DepartmentTableHead {
  constructor(private _vm: DepartmentVm) {}
  render() {
    const doc = document.getElementById("generateHead");
    doc.textContent = "";
    let tr: HTMLTableRowElement = (
      <tr style="background-color:#f6f6f6">
        <th>No.</th>
        <th>Programs</th>
        <th>No. of Stds</th>
        <th>Male</th>
        <th>Female</th>
        <th>Download</th>
      </tr>
    );
    doc.appendChild(tr);
  }
}
