import { createElement } from "tsx-create-element";
import { _ } from "../../group";
import { IView } from "../../IView";
import { GradingSystemVm } from "../../viewModels/gradingSystemVm";
import { GradeSettingsModal } from "./gradingSystemModal";


export class GradingSystemView implements IView {
    constructor(private _vm: GradingSystemVm) {
      
  }
    async oninitialized(): Promise<void> {
      await this._vm.getGradingSystem();
  }

  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Students Results</h1>
          <div class="mountcourses-form">
            <div class="sp-btn-row">
              <button class="sp-btn sp-btn-primary " id="gradeModal" style ="float:right">
              Add 
              </button>                
            </div>  
            </div>
            <div>
              <div class="results-horizontal">
                <table class="table">
                <thead>
                  <th colspan="2">No</th>
                  <th colspan="2">Type</th>
                  <th colspan="1">Commission Date</th>
                </thead>
                  <tbody id="results" >
                    {new ResultsRow(this._vm).create()}
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

     let showModal = async (evt: Event) => {
        evt.preventDefault();
        new GradeSettingsModal(this._vm).render("route-outlet");
      };
      document.getElementById("gradeModal").onclick = showModal;
  }

}

export class ResultsRow {
    constructor(private _vm: GradingSystemVm) { }
  
    private createRows() {
        let rows: HTMLTableRowElement[] = [];
        let i = 0;
        for (var grading of this._vm.groupedGrades) {
          let row: HTMLTableRowElement = <tr>
              <td colspan="2">{++i}</td>
              <td colspan="2">{grading.type}</td>
              <td colspan="1">{grading.commissionDate.split("T")[0].replaceAll("-", "/")}</td>
            </tr>;
            rows.push(row);
            rows.push(this.createHeader(grading.results));
            rows.push(<tr><td colspan="4"></td></tr>);
            rows.push(<tr><td colspan="4"></td></tr>);
        }
        return rows;
    }
    private createHeader(results) {
        return <tr>
            <td colspan="5">
                <table class="table" onMouseOver="this.style.background='#fff';" style="width:100%;">
                    <thead style="background:#f6f6f6;">
                        <tr>
                            <td>Grade</td>
                            <td>Uppper Limit</td>
                            <td>Lower Limit</td>                       
                            <td>Remark</td>
                            <td>Grade Point</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        results.map(x=>
                          <tr onMouseOver="this.style.background='#fff';">
                            <td>{x.grade}</td>
                            <td>{x.upperLimit}</td>
                            <td>{x.lowerLimit}</td>                         
                            <td>{x.gradeRemarks}</td>
                            <td>{x.gradePoint}</td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </td>
        </tr>
    }

    create() {
        return this.createRows();
    }

}
