import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { Program } from "../../models/program";
import { UploadResultViewModel } from "../../viewModels/uploadResultVm";
import { UploadResultModal } from "./uploadResultModal";
export class UploadResultView implements IView {
  constructor(private _vm: UploadResultViewModel) {}
  async oninitialized() {
    this._vm.updateCourseCommand.add(() => {
      var doc = document.getElementById("courses");
      doc.textContent = "";
      let select = (
        <select
          onChange={(evt: Event) => {
            evt.preventDefault();
            this._vm.getProgram((evt.target as any).value);
          }}
        >
          <option value="">Please Select Course</option>
          {this._vm.courses.map((x) => (
            <option value={x.mountedCourseId}>
              {x.courseCode}: {x.courseName}
            </option>
          ))}
        </select>
      );
      doc.appendChild(select);
    });

    await this._vm.getGradeSettings();
    await this._vm.getStudentsEnteryLevel();
  }
  render = (elementId: string) => {
    const headers = [
      "No",
      "Index Number",
      "Name",
      "Level",
      "Course Code",
      "Class Score(40%)",
      "Exam Score(60%)",
      "Total",
      "Grade",
    ];
    let temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Upload Results</h1>
          {/* <button class="sp-btn sp-btn-primary" id="resultsUploadPDF" onClick={(evt: Event) => {
            evt.preventDefault();
                  this._vm.generateResultsSheet()
              }}>
              GetPDF
          </button> */}
          <div class="mountcourses-form">
            <div class="sp-row-col-4">
              <p>
                <select filter>
                  {this._vm.getAcademicYears().map((x) => (
                    <option
                      binding="MountedCourseForResultUploadRequest.AcademicYear"
                      value={x.name}
                    >
                      {x.name}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <select filter>
                  {this._vm.getEnrollmentOptions().map((x) => (
                    <option
                      binding="MountedCourseForResultUploadRequest.EnrollmentOption"
                      value={x.name}
                    >
                      {x.name}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <select filter>
                  {this._vm.getSemesters().map((x) => (
                    <option
                      binding="MountedCourseForResultUploadRequest.Semester"
                      value={x.name}
                    >
                      {x.name}
                    </option>
                  ))}
                </select>
              </p>
              <p id="courses">
                <select id="mountedCoure" filter>
                  <option value="">Please Select Course</option>
                  {this._vm.courses.map((x) => (
                    <option value={x.mountedCourseId}>
                      {x.courseCode}: {x.courseName}
                    </option>
                  ))}
                </select>
              </p>
            </div>
            <div class="sp-btn-container">
              <p class="sp-row-col-1">
                <div class="sp-btn-row" style="float: right;">
                  <button
                    class="sp-btn sp-btn-default btn-small"
                    id="small-dec"
                    style="position: relative;"
                  >
                    <label class="btn-file">Upload</label>
                    <input
                      type="file"
                      class="file"
                      accept=".csv"
                      id="file"
                      onChange={(evt: Event) => {
                        evt.preventDefault();
                        this._vm.uploadResult(evt);
                        //showTableData()
                      }}
                    />
                  </button>

                  <button
                    class="sp-btn sp-btn-default btn-small"
                    id="small-dec"
                    onClick={() => {
                      new UploadResultModal(this._vm).render("route-outlet");
                    }}
                  >
                    Summary
                  </button>

                  <button
                    class="sp-btn sp-btn-default btn-small"
                    id="small-dec"
                    onClick={async () => {
                      const elements = document.getElementsByTagName("select");
                      const academicYear = elements[0] as HTMLSelectElement;
                      const mountedCourseId = elements[3] as HTMLSelectElement;
                      const enrollmentOption = elements[1] as HTMLSelectElement;
                      const semester = elements[2] as HTMLSelectElement;
                      await this._vm.download_csv(
                        academicYear.value,
                        enrollmentOption.value,
                        semester.value,
                        mountedCourseId.value
                      );
                    }}
                  >
                    Download
                  </button>
                  <button
                    class="sp-btn sp-btn-default btn-small"
                    id="small-dec"
                    style="margin-right: 0px;"
                    onClick={async (evt: Event) => {
                      evt.preventDefault();
                      await this._vm.save();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </p>
            </div>
            <div class="uploadresults-tb-container">
              <div class="horizontal">
                <table class="table stretch" id="resultsPDF">
                  <thead>
                    <tr>
                      {headers.map((headerItem) => (
                        <th>{headerItem}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody id="StudentResults"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    var doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    let getCourses = async (evt: Event) => {
      evt.preventDefault();
      const elements = document.querySelectorAll("[filter]");
      const academicYear = elements[0] as HTMLSelectElement;
      const enrollmentOption = elements[1] as HTMLSelectElement;
      const semester = elements[2] as HTMLSelectElement;
      if (enrollmentOption && academicYear && semester) {
        this._vm.academicYear = academicYear.value;
        this._vm.semester = semester.value;
        await this._vm.getMountedCourses(
          academicYear.value,
          semester.value,
          enrollmentOption.value
        );
      }
    };

    const elements = document.querySelectorAll("[filter]");
    elements.forEach(function (element) {
      (element as HTMLSelectElement).onchange = getCourses;
    });
  };
}

export class ResultRow {
  render(studentResults: any[]) {
    var doc = document.getElementById("StudentResults");
    doc.textContent = "";
    let i = 0;
    for (const r of studentResults) {
      if (!r.Isvalid) {
        let row = (
          <tr>
            <td>{++i}</td>
            <td style="color:red;font-weight:bold">{r.IndexNumber}</td>
            <td style="color:red;font-weight:bold">{r.Name}</td>
            <td>{r.Level}</td>
            <td>{r.CourseCode}</td>
            <td>{r.ClassScore}</td>
            <td>{r.ExamsScore}</td>
            <td>{r.TotalScore}</td>
            <td>{r.Grade}</td>
          </tr>
        );
        doc.appendChild(row);
      } else if (r.ExamsScore > 60 && r.ClassScore > 40) {
        let row = (
          <tr>
            <td>{++i}</td>
            <td>{r.IndexNumber}</td>
            <td>{r.Name}</td>
            <td>{r.Level}</td>
            <td>{r.CourseCode}</td>
            <td style="color:red;font-weight:bold">{r.ClassScore}</td>
            <td style="color:red;font-weight:bold">{r.ExamsScore}</td>
            <td style="color:red;font-weight:bold">{r.TotalScore}</td>
            <td>{r.Grade}</td>
          </tr>
        );
        doc.appendChild(row);
      } else if (r.ExamsScore > 60) {
        let row = (
          <tr>
            <td>{++i}</td>
            <td>{r.IndexNumber}</td>
            <td>{r.Name}</td>
            <td>{r.Level}</td>
            <td>{r.CourseCode}</td>
            <td>{r.ClassScore}</td>
            <td style="color:red;font-weight:bold">{r.ExamsScore}</td>
            <td>{r.TotalScore}</td>
            <td>{r.Grade}</td>
          </tr>
        );
        doc.appendChild(row);
      } else if (r.ClassScore > 40) {
        let row = (
          <tr>
            <td>{++i}</td>
            <td>{r.IndexNumber}</td>
            <td>{r.Name}</td>
            <td>{r.Level}</td>
            <td>{r.CourseCode}</td>
            <td style="color:red;font-weight:bold">{r.ClassScore}</td>
            <td>{r.ExamsScore}</td>
            <td>{r.TotalScore}</td>
            <td>{r.Grade}</td>
          </tr>
        );
        doc.appendChild(row);
      } else {
        let row = (
          <tr>
            <td>{++i}</td>
            <td>{r.IndexNumber}</td>
            <td>{r.Name}</td>
            <td>{r.Level}</td>
            <td>{r.CourseCode}</td>
            <td>{r.ClassScore}</td>
            <td>{r.ExamsScore}</td>
            <td>{r.TotalScore}</td>
            <td>{r.Grade}</td>
          </tr>
        );
        doc.appendChild(row);
      }
    }
  }
}

export class Courses {
  render(courses: any[]) {
    var doc = document.getElementById("courses");
    doc.textContent = "";
    let select = (
      <select>
        <option value="">Please Select Course</option>
        {courses.map((x) => (
          <option value={x.mountedCourseId}>
            {x.courseCode}: {x.courseName}
          </option>
        ))}
      </select>
    );
    doc.appendChild(select);
  }
}
