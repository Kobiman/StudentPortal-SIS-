import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { UserProfileVm } from "../../viewModels/userProfileVM";

export class userProfileView implements IView {
  constructor(private _vm: UserProfileVm) {}
  async oninitialized(): Promise<void> {
    await this._vm.getStudentList();
  }
  async render(elementId: string) {
    this._vm.student.dateOfEntry = (this._vm.student?.dateOfEntry)
      .split("T")[0]
      .replaceAll("-", "/");
    this._vm.student.dateofBirth = (this._vm.student?.dateofBirth)
      .split("T")[0]
      .replaceAll("-", "/");
    let temp = (
      <div class="sp-box" style="height:100%">
        <div class="mc-row">
          <div class="sp-row-col-2-2">
            <div class="user-img">
              <img id="uploaded-img" src="../assets/avatar.png" alt=""></img>
              <input
                onChange={this._vm.profileImagePreview}
                id="imgUpload"
                class="imgUpload"
                type="file"
                accept="image/*"
                name="Edit"
              />
              <span class="fade" id="fade"></span>
              {console.log(
                "this is the input class name " +
                  document.getElementById("imgUpload")
              )}
              <h4 class="profile-name">{this._vm.student.studentName}</h4>
              <button
                class=" sp-btn-primay-3"
                id="profileEditMobileButton"
                onclick={() => {
                  this._vm.EnableTextBox();
                }}
              >
                <span>Edit</span>
              </button>
              <button
                class=" sp-btn-primay-3"
                style="visibility:hidden"
                id="profileSaveMobileButton"
                onclick={() => {
                  this._vm.DisableTextBox();
                }}
              >
                <span>Save</span>
              </button>
              <div class="Profile-Info">
                <div class="upload-img"></div>
                <h3 class="info-headers">Personal Info:</h3>
                <label>
                  Student ID:
                  <br />
                  <span> {this._vm.student.indexNumber}</span>
                </label>
                <label>
                  Reference Number:
                  <br />
                  <span> {this._vm.student.referenceNumber}</span>
                </label>
                <label>
                  DOB (yyyy/mm/dd):
                  <br />
                  <span> {this._vm.student.dateofBirth}</span>
                </label>
                <label>
                  Gender:
                  <br />
                  <span>
                    {" "}
                    {this._vm.student.gender === "M" ? "Male" : "Female"}
                  </span>
                </label>
                <label>
                  Level:
                  <br />
                  <span> {this._vm.student.level}</span>
                </label>
              </div>
              <div class="Profile-Info-2">
                <h3 class="info-headers">Contact Info</h3>
                <label>
                  Contact:
                  <br /> <span> {this._vm.student.contact1}</span>
                </label>
                <label>
                  Personal Email:
                  <br /> <span> {this._vm.student.personalEmail}</span>
                </label>
                <label>
                  Institutional Email:
                  <br /> <span> {this._vm.student.universityEmail}</span>
                </label>
              </div>
            </div>
            <div class="profile-fields">
              <div class="profile-btn">
                <button
                  id="btnEdit"
                  value="yes"
                  onclick={() => {
                    this._vm.EnableTextBox();
                  }}
                >
                  <i class="fas fa-edit"></i>
                  Edit
                </button>
                <button
                  id="save-visibility"
                  style="visibility:hidden"
                  onclick={() => {
                    this._vm.DisableTextBox();
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
                    <label>Index Number</label>
                    <input
                      id="indexNumber"
                      type="text"
                      class="edit-text-field"
                      value={this._vm.student.indexNumber}
                      disabled="disabled"
                    />
                  </p>
                  <p>
                    <label>Reference Number</label>
                    <input
                      type="text"
                      class="edit-text-field"
                      id="referenceNumber"
                      value={this._vm.student.referenceNumber}
                      disabled="disabled"
                    />
                  </p>
                  <p>
                    <label>FullName</label>
                    <input
                      type="text"
                      class="edit-text-field"
                      id="fullName"
                      value={this._vm.student.studentName}
                      disabled="disabled"
                    />
                  </p>
                  <p>
                    <label>Program</label>
                    <input
                      type="text"
                      class="edit-text-field"
                      id="program"
                      value={this._vm.student.program}
                      disabled="disabled"
                    />
                  </p>
                  <p>
                    <label>Department</label>
                    <input
                      type="text"
                      class="edit-text-field"
                      id="department"
                      value={this._vm.student.department}
                      disabled="disabled"
                    />
                  </p>
                  <p>
                    <label>School</label>
                    <input
                      type="text"
                      class="edit-text-field"
                      id="school"
                      value={this._vm.student.school}
                      disabled="disabled"
                    />
                  </p>
                  <p>
                    <label>Contact 1</label>
                    <input
                      type="text"
                      class="edit-text-field editTable"
                      id="contact1"
                      value={this._vm.student.contact1}
                      disabled="disabled"
                      input
                    />
                  </p>
                  <p>
                    <label>University Email</label>
                    <input
                      type="text"
                      class="edit-text-field"
                      id="universityEmail"
                      value={this._vm.student.universityEmail}
                      disabled="disabled"
                    />
                  </p>
                </div>
                <div class="middle-profile-edit">
                  <p>
                    <label>DOB (yyyy/mm/dd)</label>
                    <input
                      type="text"
                      class="edit-text-field "
                      value={this._vm.student.dateofBirth}
                      disabled="disabled"
                    />
                    <div errors="DateofBirth"></div>
                  </p>
                  <p>
                    <label>Gender</label>
                    <input
                      type="text"
                      class="edit-text-field editTable"
                      id="gender"
                      value={
                        this._vm.student.gender === "M" ? "Male" : "Female"
                      }
                      disabled="disabled"
                    />
                    <div errors="Gender"></div>
                  </p>
                  <p>
                    <label>Level</label>
                    <input
                      type="text"
                      class="edit-text-field"
                      id="level"
                      value={this._vm.student.level}
                      disabled="disabled"
                    />
                  </p>
                  <p>
                    <label>Personal Email</label>
                    <input
                      type="text"
                      class="edit-text-field editTable"
                      id="personalEmail"
                      value={this._vm.student.personalEmail}
                      disabled="disabled"
                      input
                    />
                  </p>
                  <p>
                    <label>Enrollment Option</label>
                    <input
                      type="text"
                      class="edit-text-field"
                      id="enrollmentOption"
                      value={this._vm.student.enrollmentOption}
                      disabled="disabled"
                    />
                  </p>
                  <p>
                    <label>Enrollment Date</label>
                    <input
                      type="text"
                      class="edit-text-field"
                      id="enrollmentDate"
                      value={this._vm.student.dateOfEntry}
                      disabled="disabled"
                    />
                  </p>
                  <p>
                    <label>Contact 2</label>
                    <input
                      type="text"
                      class="edit-text-field editTable"
                      id="contact2"
                      value={this._vm.student.contact2}
                      disabled="disabled"
                      input
                    />
                  </p>
                  <p>
                    <label>Marital Status</label>
                    <input
                      type="text"
                      class="edit-text-field editTable"
                      id="maritalStatus"
                      value={this._vm.student.maritalStatus}
                      disabled="disabled"
                    />
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="profile-btn" id="mediaProfileButton">
          <button
            value="yes"
            onclick={() => {
              this._vm.EnableTextBox();
            }}
          >
            <i class="fas fa-edit"></i>
            Edit
          </button>
          <button
            onclick={() => {
              this._vm.DisableTextBox();
            }}
          >
            {" "}
            <i class="fas fa-save"></i>
            Save
          </button>
        </div>
      </div>
    );
    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);
  }
}
