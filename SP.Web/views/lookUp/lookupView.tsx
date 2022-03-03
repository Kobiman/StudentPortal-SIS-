import { IView } from "../../IView";
import { LookupVm } from "../../viewModels/lookupVm";
import { createElement } from "tsx-create-element";
import { App } from "../../app";
import { LookupModal } from "./lookupModal";
import { _ } from "../../group";

export class LookupView implements IView {
  constructor(private _vm: LookupVm) {}
  async oninitialized(): Promise<void> {
    await this._vm.getLookups();
    this._vm.getInstitutions();
  }

  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Lookup</h1>
          <div class="mountcourses-form">
            <div class="sp-btn-row">
              <button class="sp-btn sp-btn-default btn-small" id="addLookup">
                Add
              </button>
            </div>
            <div>
              <table class="table-hd" id="lookupViewHead">
                <thead>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Type</th>
                </thead>
              </table>

              <div class="horizontal">
                <table class="table css-serial" id="lookupView">
                  <thead hidden>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody id="lookups" data-repeat="lookups">
                    {this._vm.lookups.map((x) => (
                      <tr>
                        <td></td>
                        <td binding="name">{x.name}</td>
                        <td binding="type">{x.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

      new LookupModal(this._vm).render("route-outlet");
    };

    _.syncTable("lookupViewHead", "lookupView");

    document.getElementById("addLookup").onclick = showModal;
  }
}
