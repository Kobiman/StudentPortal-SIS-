import { createElement } from "tsx-create-element";
import { StudentListVm } from "../../viewModels/StudentListVm";

export class StudentDetails{
    constructor(private _vm: StudentListVm) {
    }
     render(){
      function openTab(evt, header) {
        var i, content, tabClick;
        content = document.getElementsByClassName("content");
        for (i = 0; i < content.length; i++) {
          content[i].style.display = "none";
        }
        tabClick = document.getElementsByClassName("tabClick");
        for (i = 0; i < tabClick.length; i++) {
          tabClick[i].className = tabClick[i].className.replace(" active", "");
        }
        document.getElementById(header).style.display = "block";
        evt.currentTarget.className += " active";
          }
       return <div class="edit-content">
       <div class="profile-form">
           <div class="sp-row-col-2-2-1">
           <div class="user-info">
               <img id="uploaded-img" src="../assets/avatar.png" alt=""></img>
               <input id="imgUpload" class="img-upload" type="file" name="Edit"/>
           
               <div class="studentList-profile-info">
               <div class="upload-img">
                 <span>{this._vm.student.studentName}</span>
               </div>
               <h3 class="info-headers">Student Details:</h3>
               <label>Student ID:
                 <span>{this._vm.student.indexNumber}</span>
               </label>
               <label>Reference Number:
                   <span>  {this._vm.student.referenceNumber}</span>
               </label>
               <label>   DOB (yyyy/mm/dd):
                   <span>{this._vm.student.dateOfBirth}</span>
               </label>
               <label>Gender:
                   <span>{this._vm.student.gender==="M"?"Male":"Female"}</span>
               </label>
               <label>Contact:
                 <span>{this._vm.student.contact1}</span>
               </label>
               <label>Program:
                   <span>{this._vm.student.program}</span>
               </label>
               <label>Level:
                   <span>{this._vm.student.level}</span>
               </label>
               </div>                      
           </div>
           <div clas="profile-fields">
             <div class="tab">
               <button class="tabClick" onClick={(evt) => {
                 openTab(evt, 'personal');
               }} >Personal Details</button>
               <button class="tabClick" onClick={(evt) => {
                 openTab(evt, 'academic');
               }}> Academic Details</button>
               <button class="tabClick" onClick={(evt) => {
                 openTab(evt, 'guardian');
               }}> Guardian Details</button>
               
               <button style="width:12%;" onclick={()=>{
                 document.getElementById("btnEdit").style.visibility = "visible";
                 let input = document.querySelectorAll("[input]");
                 input.forEach(function (item) {
                   item.toggleAttribute("disabled");
                 });
                 this._vm.update();
               }}>
                 <i class="fas fa-save"></i>
                 Save
               </button>
               <button id="btnEdit" value="yes" style="visibility:hidden; width:12%;" onclick={()=>{
                         let input = document.querySelectorAll("[input]");
                         input.forEach(function (item) {
                           item.toggleAttribute("disabled");
                         });
                     }}
                     ><i class="fas fa-edit"></i>
                 Edit
               </button>
             </div>
             <div class="content active" id="personal">
                <form class="student-edit-details">        
                  <div class="left-profile-edit">
                      <p>
                          <label>Surname</label>
                          <input id="surname" type="text" class="edit-text-field"  value={this._vm.student.surname} input/>
                      </p>
                      <p>
                          <label>Contact 1</label>
                          <input type="text" class="edit-text-field" id="referenceNumber" value={this._vm.student.contact1} input/>
                      </p>
                      <p>
                          <label>Marital Status</label>
                          <input type="text" class="edit-text-field" id="program" value={this._vm.student.maritalStatus} input/>
                      </p>
                          <p>
                          <label>Country</label>
                          <input type="text" class="edit-text-field" id="department" value= {this._vm.student.country} input/>
                          </p>
                      
                </div>
                <div class="middle-profile-edit">
                      <p>
                          <label>Other Names</label>
                          <input type="text" class="edit-text-field editTable" id="contact1" value={this._vm.student.othernames} input/>
                      </p>
                      <p>
                          <label>Contact 2</label>
                          <input type="text" class="edit-text-field editTable" id="contact2" value={this._vm.student.contact2} input/>
                      </p>            
                      <p>
                          <label>Personal Email</label>
                          <input type="text" class="edit-text-field editTable" id="personalEmail" value={this._vm.student.personalEmail} input/>
                      </p>
                      <p>
                          <label>Gender</label>
                          <input type="text" class="edit-text-field editTable" id="maritalStatus" value={this._vm.student.gender==="M"?"Male":"Female"} input/>
                      </p>
                      
                  </div>  
                  <div class="right-profile-edit">
                    <p>
                          <label>DOB (yyyy/mm/dd)</label>
                          <input type="text" class="edit-text-field" id="school" value={this._vm.student.dateofBirth} input/>
                      </p>
                      <p>
                          <label>Region</label>
                          <input type="text" class="edit-text-field editTable" id="country" value={this._vm.student.region} input/>
                      </p>
                    </div>                 
                </form>
              </div>
             <div class="content" id="academic">
                      <form class="student-edit-details"> 
                        <div class="left-profile-edit">
                            <p>
                                <label>Index Number</label>
                                <input id="indexNumber" type="text" class="edit-text-field" disabled value={this._vm.student.indexNumber} input/>
                            </p>
                            <p>
                                <label>Reference Number</label>
                                <input type="text" class="edit-text-field" id="referenceNumber" disabled value={this._vm.student.referenceNumber} input/>
                            </p>                       
                            <p>
                                <label>Program</label>
                                <input type="text" class="edit-text-field" id="program" value={this._vm.student.program} input/>
                            </p>
                                <p>
                                <label>Department</label>
                                <input type="text" class="edit-text-field" id="department" value= {this._vm.student.department} input/>
                                </p>
                           
                      </div>
                      <div class="middle-profile-edit">
                          <p>
                              <label>University Email</label>
                              <input type="text" class="edit-text-field" id="universityEmail" value={this._vm.student.universityEmail} input/>  
                          </p>  
                          <p>
                              <label>Level</label>
                              <input type="text" class="edit-text-field" id="level"  value={this._vm.student.level} input/>
                          </p> 
                          <p>
                              <label>Enrollment Option</label>
                              <input type="text" class="edit-text-field" id="enrollmentOption" value={this._vm.student.enrollmentOption} input/>
                          </p>
                          <p>
                              <label>Enrollment Date</label>
                              <input type="text" class="edit-text-field" id="enrollmentDate" disabled value={this._vm.student.dateOfEntry} input/>
                          </p>                  
                      </div>  
                      <div class="right-profile-edit">
                          <p>
                              <label>School</label>
                              <input type="text" class="edit-text-field" id="school" disabled value={this._vm.student.school} input/>
                        </p>
                        <p>
                              <label>Program Status</label>
                              {/* <input type="text" class="edit-text-field" id="school" value={this._vm.student.progStatus} input /> */}
                              <select class="edit-text-field" id="progStatus" style="height:37px; width: 101%;" filter>
                              <option value="">Program Status</option>
                              {this._vm.progStatus.map((x) => (
                              <option value={x}>{x}</option>
                              ))} </select>
                        </p>
                        
                        </div>             
                    </form>
                  </div>
             <div class="content" id="guardian">
                      <form class="student-edit-details"> 
                        <div class="left-profile-edit">
                            <p>
                                <label>Surname</label>
                                <input id="indexNumber" type="text" class="edit-text-field" value={`Tendani`} input/>
                            </p>
                            <p>
                                <label>Other Names</label>
                                <input type="text" class="edit-text-field" id="referenceNumber" value={`Aborapia`} input/>
                            </p>                       
                            <p>
                                <label>Contact</label>
                                <input type="text" class="edit-text-field" id="program" value={`0000000000`} input/>
                            </p>
                                <p>
                                <label>Email</label>
                                <input type="text" class="edit-text-field" id="department" value={`toomuchmoney@gmail.com`} input/>
                                </p>
                            
                      </div>
                      <div class="middle-profile-edit">
                            <p>
                                <label>Address</label>
                                <input type="text" class="edit-text-field" id="universityEmail" value={`TMA 051`} input/>  
                            </p>  
                            <p>
                                <label>Hometown</label>
                                <input type="text" class="edit-text-field" id="level"  value={`Techiman`} input/>
                            </p> 
                            <p>
                                <label>Region</label>
                                <input type="text" class="edit-text-field" id="enrollmentOption" value={`Bono east`} input/>
                            </p>
                            <p>
                                <label>Country</label>
                                <input type="text" class="edit-text-field" id="enrollmentDate" value={`Ghana`} input/>
                            </p>                  
                        </div> 
                        <div class="right-profile-edit">
                          <p>
                                <label>Relation</label>
                                <input type="text" class="edit-text-field" id="school" value={`Father`} input/>
                            </p>
                          </div>              
                      </form>
                    </div>
                </div>
            </div>
           </div>    
        </div>;
     }
  }