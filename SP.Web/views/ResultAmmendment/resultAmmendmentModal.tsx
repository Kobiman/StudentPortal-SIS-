import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { ResultsAmmendmentVm } from "../../viewModels/resultsAmmendmentVm";

export class ResultsAmmendmentModal implements IView {   
    constructor(private _vm: ResultsAmmendmentVm) {
    }
    async oninitialized(): Promise<void> {
    }
    render(elementId: string): void {
        
        const temp = (
            <div class="mountcourse-modal" id="modal">
                <div class="modal-content">
                    <div class="sp-box" style="margin-top:90px;">
                        <div class="sp-row">
                            <h1>Result Ammendment</h1>
                            <form class="mountcourses-form">
                                <div class="academyear">
                                    <p id="gradeModalTextEdit">
                                    <label>Commission Date:12/12/2022</label>
                                    </p>
                                <p id="gradeModalTextEdit">
                                    <label>Semester:1</label>
                                    </p>
                                </div>
                                <div class="department">
                                     <p id="gradeModalTextEdit">
                                    <label>Department:Computer Science and Infomatics</label>
                                     </p>
                                <p id="gradeModalTextEdit">
                                    <label>Index Number:UE20004312</label>
                                </p>
                                </div>
                                <div class="coursecode">
                                    <p id="gradeModalTextEdit">
                                    <label>Course Code:Comp404</label>
                                    </p>
                                <p id="gradeModalTextEdit">
                                    <label>Course Title:Programming for Novics</label>
                                    </p>
                                </div>
                                <h4>Previous Mark</h4>
                                <div>
                                    <table class="table css-serial" id="courseView">
                                    <thead >
                                        <tr>
                                        <th>CA</th>
                                        <th>Final Exam</th>
                                        <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody id="courses" data-repeat="courses">
                                        {
                                            <tr>
                                            <td>{45}</td>
                                            <td>{56}</td>
                                            <td>{ 67}</td>
                                        </tr>
                                        // this._vm.result.map(x => <tr>
                                        //     <td>{x.CA}</td>
                                        //     <td>{x.Exam}</td>
                                        //     <td>{x.Total}</td>
                                        // </tr>)
                                        }
                                    </tbody>
                                    </table>
                                </div>

                                <h4>New Mark</h4>
                                <div>
                                    <table class="table css-serial" id="courseView">
                                    <thead >
                                        <tr>
                                        <th>CA</th>
                                        <th>Final Exam</th>
                                        <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody id="courses" data-repeat="courses">
                                        {  
                                         <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        }
                                    </tbody>
                                    </table>
                                </div>
                                
                                <div class="sp-btn-row">
                                    <button class="sp-btn sp-btn-primary" id="save" onClick={(evt: Event) => {
                                        evt.preventDefault();
                                        const elements = document.querySelectorAll("[filter]");
                                        const cDate = (elements[0] as HTMLInputElement).value;
                                        const type = (elements[1] as HTMLSelectElement).value;
                                        const uLimit = (elements[2] as HTMLInputElement).value;
                                        const lLimit = (elements[3] as HTMLInputElement).value;
                                        const grade = (elements[4] as HTMLInputElement).value;
                                        const gradePoint = (elements[5] as HTMLInputElement).value;
                                        const remarks = (elements[6] as HTMLInputElement).value;
                                        this._vm.save(cDate,type,uLimit,lLimit,grade,gradePoint,remarks);
                                        }}
                                    >
                                       Update
                                    </button>
                                    <button class="sp-btn sp-btn-default" id="close">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
      
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);

       let hideModal = async (evt: Event) => {
            evt.preventDefault();
            doc.removeChild(temp);
    };

        document.getElementById("close").onclick = hideModal;
    }
  }
    