import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { LecturerProfileVm } from "../../viewModels/lecturerProfileVm";

export class lecturerProfileView implements IView {
  constructor(private _vm: LecturerProfileVm) {}

  async oninitialized(): Promise<void> {
    await this._vm.getLecturer();
  }
  async render(elementId: string) {
    let temp = (
      <div class="sp-box" style="height:95%  ">
        <div class="mc-row" style="height:100%; ">
          <div class="profile-form" style="height:100%; ">
            <div class="sp-row-col-2-2" style="height:100%">
              <div class="user-img">
                <div>
                  <img
                    id="uploaded-img"
                    src="../assets/avatar.png"
                    alt=""
                  ></img>
                  <input
                    onChange={this._vm.profileImagePreview}
                    id="imgUpload"
                    class="imgUpload"
                    type="file"
                    name="Edit"
                    accept="image/*"
                  />
                  <span class="fade" id="fade"></span>
                  <h4 class="profile-name">{this._vm.lecturer.name}</h4>
                </div>

                <div class="Profile-Info">
                  <div class="upload-img"></div>
                  <h3 class="info-headers">Profile Info:</h3>
                  <label>
                    Staff ID:
                    <br />
                    <span>{this._vm.lecturer.staffId}</span>
                  </label>
                  <label>
                    contact:
                    <br />
                    <span>{this._vm.lecturer.telephone}</span>
                  </label>
                  <label>
                    Emergency Contact
                    <br />
                    <span>{this._vm.lecturer.telephone}</span>
                  </label>
                  <label>
                    Personal Email:
                    <br />
                    <span>{this._vm.lecturer.email}</span>
                  </label>
                  <label>
                    Insitutional Email:
                    <br />
                    <span>{this._vm.lecturer.email}</span>
                  </label>
                  <label>
                    Department:
                    <br />
                    <span>Computer Science and Informatics</span>
                  </label>
                  <label>
                    School:
                    <br />
                    <span>Natural Resources</span>
                  </label>
                </div>
              </div>
              <div clas="profile-fields ">
                <div class="profile-btn">
                  <button
                    id="btnEdit"
                    value="yes"
                    onclick={() => {
                      this._vm.enableTexbox();
                    }}
                  >
                    <i class="fas fa-edit"></i>
                    Edit
                  </button>
                  <button
                    id="save-visibility"
                    style="visibility:hidden"
                    onclick={() => {
                      this._vm.disableTextBox();
                    }}
                  >
                    {" "}
                    <i class="fas fa-save"></i>
                    Save
                  </button>
                </div>
                <form class="sp-form-profile">
                  <div class="left-profile-edit">
                    <p>
                      <label>FullName</label>
                      <input
                        id="name"
                        type="text"
                        class="edit-text-field"
                        disabled="disabled"
                        value={this._vm.lecturer.name}
                      />
                    </p>
                    <p>
                      <label>Staff ID</label>
                      <input
                        type="text"
                        class="edit-text-field"
                        id="staffId"
                        disabled="disabled"
                        value={this._vm.lecturer.staffId}
                      />
                    </p>
                    <p>
                      <label>Contact</label>
                      <input
                        type="text"
                        class="edit-text-field editTable"
                        id="contact"
                        disabled="disabled"
                        value={this._vm.lecturer.telephone}
                      />
                    </p>
                    <p>
                      <label>Emergency Contact</label>
                      <input
                        type="text"
                        class="edit-text-field editTable"
                        id="emyContact"
                        disabled="disabled"
                        value={this._vm.lecturer.telephone}
                      />
                    </p>
                    <p>
                      <label>Personal Email</label>
                      <input
                        type="text"
                        class="edit-text-field editTable"
                        id="personalEmail"
                        disabled="disabled"
                        value={this._vm.lecturer.email}
                      />
                    </p>
                    <p>
                      <label>Institutional Email</label>
                      <input
                        type="text"
                        class="edit-text-field"
                        id="instEmail"
                        disabled="disabled"
                        value={this._vm.lecturer.email}
                      />
                    </p>
                    <p>
                      <label>Department</label>
                      <input
                        type="text"
                        class="edit-text-field"
                        id="department"
                        disabled="disabled"
                        value={this._vm.lecturer.lecturerId}
                      />
                    </p>
                    <p>
                      <label>School</label>
                      <input
                        type="text"
                        class="edit-text-field"
                        id="school"
                        disabled="disabled"
                        value=""
                      />
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);
  }
}

function enableTexboxes() {
  throw new Error("Function not implemented.");
}
