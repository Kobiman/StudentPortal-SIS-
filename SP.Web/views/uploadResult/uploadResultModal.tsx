import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { UploadResultViewModel } from "../../viewModels/uploadResultVm";

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export class UploadResultModal implements IView {
  constructor(private _vm: UploadResultViewModel) {}
  async oninitialized(): Promise<void> {}
  render(elementId: string): void {
    const temp = (
      <div class="mountcourse-modal" id="modal">
        <div class="modal-content">
          <div class="sp-box" style="margin-top:90px;">
            <div class="sp-row">
              <h1>Results Summary</h1>
              <form class="mountcourses-form">
                <div class="sp-btn-row">
                  <p id="chartdiv" style="height:450px; width:800px"></p>
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
    //doc.textContent = "";
    doc.appendChild(temp);

    let hideModal = async (evt: Event) => {
      evt.preventDefault();

      doc.removeChild(temp);
    };

    document.getElementById("close").onclick = hideModal;

    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let chart2 = am4core.create("chartdiv", am4charts.PieChart);

    // Add data
    chart2.data = this._vm.resultSummary;
    let pieSeries = chart2.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "total";
    pieSeries.dataFields.category = "grade";
  }
}
