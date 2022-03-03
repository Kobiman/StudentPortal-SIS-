import { createElement } from "tsx-create-element";
import { StudentResultsVm } from "../../viewModels/StudentResultsVm";
import { _ } from "../../group";
import { IView } from "../../IView";
import { CustomRenderer } from "../../customRenderer";


export class StudentResultsView implements IView {
    constructor(private _vm: StudentResultsVm) {
      this._vm.resultChangedCommand.add(()=>{
        CustomRenderer.renderElements("results",new ResultsRow(this._vm).create());
      });
  }
  async oninitialized(): Promise<void> {
    await this._vm.getStudentResults();
  }

  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Students Results</h1>
          <div class="mountcourses-form">
            <div class="sp-btn-row">
              <button class="sp-btn sp-btn-primary " id="download" style ="float:right"
              onClick={() => {                  
                  this._vm.generateResultsPDF();}}
              >
              DOWNLOAD 
              </button>                
            </div>  
            </div>
            <div>
              <div class="results-horizontal">
                <table class="table">
                <thead>
                  <th colspan="2">Level</th>
                  <th colspan="2">Semester</th>
                  <th colspan="1">GPA</th>
                  <th colspan="1">CuGPA: <span id="cummulativeGPA"></span></th>
                  <th colspan="1">Crd</th>
                  <th colspan="1">CCrd: <span id="cummulativeCredit"></span></th>
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

      document.getElementById("cummulativeGPA").textContent = this._vm.cummulativeGPA;
      document.getElementById("cummulativeCredit").textContent = this._vm.cummulativeCredit;
  }
}

export class ResultsRow {
    constructor(private _vm: StudentResultsVm) { }
  
    private createRows() {
        let rows: HTMLTableRowElement[] = [];
        for (var result of this._vm.groupedResults) {
          let row: HTMLTableRowElement = <tr>
              <td colspan="2">{result.level}</td>
              <td colspan="2">{result.semester}</td>
              <td colspan="1">{result.gpa}</td>
              <td colspan="1">{result.cugpa}</td>
              <td colspan="1">{result.credit}</td>
              <td colspan="1">{result.cuCredit}</td>
            </tr>;
            rows.push(row);
            rows.push(this.createHeader(result.results));
            rows.push(<tr><td colspan="4"></td></tr>);
            rows.push(<tr><td colspan="4"></td></tr>);
        }
        return rows;
    }
    private createHeader(results) {
        return <tr>
            <td colspan="8">
                <table class="table" onMouseOver="this.style.background='#fff';" style="width:100%;">
                    <thead style="background:#f6f6f6;">
                        <tr>
                            <td width="10%">CourseCode</td>
                            <td width="50%">CourseTitle</td>
                            <td>Credit</td>                       
                            <td>Total</td>
                            <td>Grade</td>
                            <td>GP</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        results.map(x=>
                          <tr onMouseOver="this.style.background='#fff';">
                            <td>{x.courseCode}</td>
                            <td>{x.courseName}</td>
                            <td>{x.credit}</td>                         
                            <td>{x.totalMark}</td>
                            <td>{x.grade}</td>
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
