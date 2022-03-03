import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { FeesStatementVm } from "../../viewModels/FeesStatementVm";

export class FeesStatementView implements IView{
    constructor(private _vm: FeesStatementVm) {
    }
    async oninitialized(): Promise<void> {
        await this._vm.getFeesStatus();
    }
    render(elementId: string){
        var temp = (
             <div class="sp-box">
                <div class="mc-row">
                    <h1>Fees Statement</h1>
                    <div class="fees-summary">
                        <p id="arrears">Arrears</p>
                        <p id="balance">Balance</p>
                    </div>
                    <div class="lect-horizontal">
                      <table class="table css-serial" id="lecturerView">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Academic Year</th>
                                <th>Transaction Date</th>
                                <th>Transaction Time</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Balance</th>
                                <th>Naration</th>
                                <th>Bank</th>
                                <th>Receipt No.</th>
                            </tr>
                        </thead>
                        <tbody id="lecturers" data-repeat="results">
                        {
                          this._vm.statement.map(x =>
                            <tr>
                                <td></td>
                                <td>{ x.academicYear }</td>
                                <td>{x.transactionDate.split("T")[0]}</td>
                                <td>{x.transactionDate.split("T")[1].substring(1,8)}</td>
                                <td>{ x.debit.toFixed(2) }</td>
                                <td>{ x.credit.toFixed(2) }</td>
                                <td>{x.balance.toFixed(2)}</td>
                                <td>{x.naration}</td>
                                <td>{x.bank}</td>
                                <td width="10%">{ x.receiptNumber.trim()}</td>
                          </tr>
                            )
                          }
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        );
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        
        this._vm.calculateAmount();
     }
  }