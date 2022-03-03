import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { AddStudentVm } from "../../viewModels/AddStudentVm";

export class AddStudentView implements IView {
  _addStudentVm: AddStudentVm;
  constructor(addStudentVm: AddStudentVm) {
    this._addStudentVm = addStudentVm;
  }
  async oninitialized(): Promise<void> {

  }

   render(elementId: string):void {
    //App.navigate('/app/addStudent/stage1');
    //new HeaderComponent().render('header');
    //this.addEventListener(this);
  }

  // addEventListener(self){
  //   const elements = document.querySelectorAll('[click]');

  //      elements.forEach(function(element){
  //       element.addEventListener('click', (evt: Event) => {
  //            evt.preventDefault();
  //            var route = element.getAttribute('click');
  //            //App.navigate(route);
  //            self.addEventListener(self);
  //        });
  //      });
  // }

  // render = (elementId: string): void =>{
  //   var temp =  <div class="sp-box">
  //                  <h1>Add Student</h1>
  //                  <form class="sp-form">
  //                     <div class="left">
  //                        <p>
  //                          <label>Index Number</label>
  //                          <input id="surname" binding="IndexNumber" type="text"/>
  //                        </p>
  //                        <p>
  //                          <label>Reference Number</label>
  //                          <input type="text" binding="ReferenceNumber"/>
  //                        </p>
  //                        <p>
  //                          <label>Title</label>
  //                          <input type="text" binding="Title"/>
  //                        </p>
  //                        <p>
  //                          <label>Surname</label>
  //                          <input type="text" binding="Surname"/>
  //                        </p>
  //                        <p>
  //                          <label>Othernames</label>
  //                          <input type="text" binding="Othernames"/>
  //                        </p>
  //                        <p>
  //                          <label>Gender</label>
  //                          <input type="text" binding="Gender"/>
  //                        </p>
  //                     </div>
  //                     <div class="right">
  //                        <p>
  //                          <label>Marital Status</label>
  //                          <input type="text" binding="MaritalStatus"/>
  //                        </p>
  //                        <p>
  //                          <label>Date Of Birth</label>
  //                          <input type="text" binding="DateofBirth"/>
  //                        </p>
  //                        <p>
  //                          <label>Country</label>
  //                          <input type="text" binding="Country"/>
  //                        </p>
  //                        <p>
  //                          <label>Region</label>
  //                          <input type="text" binding="Region"/>
  //                        </p>
  //                        <p>
  //                          <label>HomeTown</label>
  //                          <input type="text" binding="HomeTown"/>
  //                        </p>
  //                        <p>
  //                          <label>Disability</label>
  //                          <input type="text" binding="Disability"/>
  //                        </p>
  //                     </div>
  //                     <div class="sp-btn-row">
  //                       <button class="sp-btn sp-btn-primary" id="save">Save</button>
  //                       <button class="sp-btn sp-btn-default" id="cancel">Cancel</button>
  //                     </div>
  //                   </form>
  //               </div>

  //   const doc = document.getElementById(elementId);
  //   doc.textContent = '';
  //   doc.appendChild(temp);

  //   document.getElementById("save").addEventListener('click', (evt: Event) => {
  //     evt.preventDefault();
  //     this._addStudentVm.save();
  //   });

  //   document.getElementById("cancel").addEventListener('click', (evt: Event) => {
  //     evt.preventDefault();
  //     this._addStudentVm.gotoFrontPage();
  //   });

  //   this._addStudentVm.bindData();
  //   new HeaderComponent().render('header');
  // }
}
