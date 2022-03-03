import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { InstitutionVm } from "../../viewModels/InstitutionVm";
import { InstitutionModal } from "./institutionModal";
import { App } from "../../app";
import { _ } from "../../group";

export class InstitutionView implements IView {
  constructor(private _vm: InstitutionVm) {}
  async oninitialized(): Promise<void> {
    await this._vm.getInstitutions();
  }

  render = (elementId: string): void => {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Institutions</h1>
          <div class="mountcourses-form">
            <div class="sp-btn-row">
              <button
                class="sp-btn sp-btn-default btn-small"
                id="addInstitution"
              >
                Add
              </button>
            </div>
            <div>
              <table class="table-hd" id="institutionViewHead">
                <thead>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Email</th>
                  <th>Telephone</th>
                  <th>Postal Address</th>
                </thead>
              </table>

              <div class="horizontal">
                <table class="table css-serial" id="institutionView">
                  <thead hidden>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Country</th>
                      <th>City</th>
                      <th>Email</th>
                      <th>Telephone</th>
                      <th>Postal Address</th>
                    </tr>
                  </thead>
                  <tbody id="institutions" data-repeat="institutions">
                    {this._vm.institutions.map((x) => (
                      <tr>
                        <td></td>
                        <td binding="name">{x.name}</td>
                        <td binding="code">{x.code}</td>
                        <td binding="country">{x.country}</td>
                        <td binding="city">{x.city}</td>
                        <td binding="email">{x.email}</td>
                        <td binding="telephone">{x.telephone}</td>
                        <td binding="postalAddress">{x.postalAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div class="edit-content">
                <div class="profile-form">
                  <div class="sp-row-col-2-2-2">
                    <div class="user-info">
                      <h3 class="edit-info-headers">Institution Details:</h3>
                      <div class="edit-profile-info">
                        <label>
                          Institution ID:
                          <br />
                          <span>{this._vm.institution.institutionId}</span>
                        </label>
                        <label>
                          Institution Code:
                          <br /> <span>{this._vm.institution.code}</span>
                        </label>
                        <label>
                          Institution Name:
                          <br />
                          <span>{this._vm.institution.name}</span>
                        </label>
                        <label>
                          Country:
                          <br />
                          <span>{this._vm.institution.country}</span>
                        </label>
                        <label>
                          City:
                          <br />
                          <span>{this._vm.institution.city}</span>
                        </label>
                        <label>
                          Email:
                          <br />
                          <span>{this._vm.institution.email}</span>
                        </label>
                        <label>
                          Telephone:
                          <br />
                          <span>{this._vm.institution.telephone}</span>
                        </label>
                      </div>
                    </div>
                    <div clas="profile-fields">
                      <div class="edit-profile-btn">
                        <button
                          onclick={() => {
                            this._vm.DisableTextBox();
                          }}
                        >
                          {" "}
                          <i class="fas fa-save"></i>
                          Save
                        </button>

                        <button
                          id="btnEdit"
                          value="yes"
                          style="visibility:hidden"
                          onclick={() => {
                            this._vm.EnableTextBox();
                          }}
                        >
                          <i class="fas fa-edit"></i>
                          Edit
                        </button>
                      </div>

                      <form class="edit-details">
                        <div class="left-profile-edit">
                          <p>
                            <label>Institution ID</label>
                            <input
                              id="indexNumber"
                              type="text"
                              class="edit-text-field"
                              value={this._vm.institution.institutionId}
                              disabled="disabled"
                            />
                          </p>
                          <p>
                            <label>Institution Code</label>
                            <input
                              type="text"
                              class="edit-text-field"
                              id="referenceNumber"
                              value={this._vm.institution.code}
                              input
                            />
                          </p>
                          <p>
                            <label>Institution Name</label>
                            <input
                              type="text"
                              class="edit-text-field"
                              id="fullName"
                              value={this._vm.institution.name}
                              input
                            />
                          </p>
                          <p>
                            <label>Country</label>
                            <input
                              type="text"
                              class="edit-text-field"
                              id="program"
                              value={this._vm.institution.country}
                              input
                            />
                          </p>
                        </div>
                        <div clas="middle-profile-edit">
                          <p>
                            <label>City</label>
                            <input
                              type="text"
                              class="edit-text-field"
                              id="program"
                              value={this._vm.institution.city}
                              input
                            />
                          </p>
                          <p>
                            <label>Email</label>
                            <input
                              type="text"
                              class="edit-text-field"
                              id="program"
                              value={this._vm.institution.email}
                              input
                            />
                          </p>
                          <p>
                            <label>Telephone</label>
                            <input
                              type="text"
                              class="edit-text-field"
                              id="program"
                              value={this._vm.institution.telephone}
                              input
                            />
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    this.addClickEvent();

    let showModal = async (evt: Event) => {
      evt.preventDefault();
      new InstitutionModal(this._vm).render("route-outlet");
    };
    _.syncTable("institutionViewHead", "institutionView");

    document.getElementById("addInstitution").onclick = showModal;
  };

  addClickEvent = async () => {
    let editInstitution = async (evt: Event) => {
      evt.preventDefault();
      let row = (evt.target as HTMLButtonElement)
        .parentElement as HTMLTableRowElement;
      const code = row.cells[2].innerText;
      this._vm.code = code;
      await this._vm.getInstitutionDetails();
      new InstitutionView(this._vm).render("route-outlet");
    };

    const elements = document.querySelectorAll("td");
    elements.forEach(function (element) {
      (element as HTMLElement).onclick = editInstitution;
    });
  };
}
