import { createElement } from "tsx-create-element";
import { DepartmentVm } from "../../viewModels/departmentVm";

export class DepartmentTableRow {
  constructor(private _vm: DepartmentVm) {}
  render() {
    const doc = document.getElementById("statistics");

    doc.textContent = "";
    let i = 0;
    for (let rows of this._vm.fillTable()) {
      let row = rows.map((x) => <td>{x}</td>);
      let tr: HTMLTableRowElement = (
        <tr>
          <td>{++i}</td>
          {row}
          <td>
            <button
              class="sp-btn td-btn"
              button
              onClick={(evt: Event) => {
                let row = (evt.target as HTMLButtonElement).parentElement
                  .parentElement as HTMLTableRowElement;
                const program = row.cells[1].innerText;
                this._vm.download_csv(program);
              }}
            >
              <i class="fa fa-download"> </i>
              Excel
            </button>
          </td>
        </tr>
      );
      doc.appendChild(tr);
    }
  }
}
