import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { ApproveRegistrationVm } from "../../viewModels/approveRegistrationVm";
import { ApproveRegistrationTableRow } from "./ApproveRegistrationTableRow";

export class ApproveRegistrationModal implements IView {
    constructor(private _vm: ApproveRegistrationVm, private indexNumber: string) {
    }
  async oninitialized(): Promise<void> {
  }
    render(elementId: string): void {
      var temp = (
        <div class="mountcourse-modal" id="modal">
          <div class="modal-content">
            <div class="sp-box">
              <div class="sp-row">
                <div class="mountcourses-form">                                 
                 <div class="approve-top-btns">
                    <button class="sp-btn sp-btn-primary" id="accept">
                      Aprove 
                    </button>
                    <button class="approve-modal-btn" id="close">
                      <li class="fa fa-times" style="width: 19px"></li>
                    </button>
                  </div>
                  <div class="dropdown">
                    <h1 id="dropdown-header"><span class="sp-bold"><a onClick={(evt:Event) => {
                     evt.preventDefault();
                     if((evt.target as HTMLAnchorElement).getAttribute("class") === "fa fa-minus"){               
                       colapseTable(evt);
                        let element = (document.getElementsByClassName("registered"));
                        (element as any)[0].style.display = "none";             
                     }
                     else{
                       expandTable(evt); 
                       let element = (document.getElementsByClassName("registered"));                 
                       (element as any)[0].style.display = "inline"; 
                        
                     }
                     
                    }}><li class="fa fa-minus" ></li></a>&nbsp;	&nbsp; &nbsp;	&nbsp;Registered Courses</span></h1>                   
                  </div>
                  <div class="registered"> 
                  <div class="approve-horizontal">        
                     <table class="table">
                      <thead class="table">
                          <th>Course Code</th>
                          <th>Course Title</th> 
                          <th>Credit</th>
                          <th>Option</th>
                          <th>Remove</th>
                          <th>Defer</th>
                      </thead>
                      <tbody id="approveRegistrationRow">
                          
                      </tbody>
                    </table> 
                  </div>
                  </div>
                  <div class="dropdown">
                    <h1 id="dropdown-header"><span class="sp-bold"><a onClick={(evt:Event) => {
                     evt.preventDefault();
                     if((evt.target as HTMLAnchorElement).getAttribute("class") === "fa fa-plus"){
                       expandTable(evt);
                        let element = (document.getElementsByClassName("trail"));                 
                       (element as any)[0].style.display = "inline";                 
                     }
                     else{
                       colapseTable(evt);                       
                        let element = (document.getElementsByClassName("trail"));
                        (element as any)[0].style.display = "none"; 
                     }
                     
                    }}><li class="fa fa-plus" ></li></a>&nbsp;	&nbsp; &nbsp;	&nbsp;Trail Courses</span></h1>                   
                  </div>
                  <div class="trail">
                  <div class="approve-horizontal">
                  <table class="table" >
                  <thead class="table">
                          <th>Course Code</th>
                          <th>Course Title</th>
                          <th>Credit</th>
                          <th>Option</th>
                          <th>Add</th>
                      </thead>
                    <tbody id="unregisteredTrailCourses">
                    </tbody>
                  </table>
                  </div>
                  </div>
                  <div class="dropdown">
                    <h1 id="dropdown-header"><span class="sp-bold"><a onClick={(evt:Event) => {
                     evt.preventDefault();
                     if((evt.target as HTMLAnchorElement).getAttribute("class") === "fa fa-plus"){
                       expandTable(evt);
                      let element = (document.getElementsByClassName("mounted"));                 
                      (element as any)[0].style.display = "inline"; 
                      let element1 = (document.getElementsByClassName("registered"));
                       (element1 as any)[0].style.display = "none"; 
                       (element1 as any)[0].class = "fa fa-plus";  
                      let element2 = (document.getElementsByClassName("trail"));
                       (element2 as any)[0].style.display = "none"; 
                       (element2 as any)[0].class = "fa fa-plus";                      
                     }
                     else{
                       colapseTable(evt);                       
                        let element = (document.getElementsByClassName("mounted"));
                        (element as any)[0].style.display = "none"; 
                     }
                     
                    }}><li class="fa fa-plus" ></li></a>&nbsp;	&nbsp; &nbsp;	&nbsp;Mounted Courses</span></h1>                    
                  </div>
                  <div class="mounted">
                  <div class="approve-horizontal">
                  <table class="table">
                  <thead class="table">
                          <th>Course Code</th>
                          <th>Course Title</th>
                          <th>Credit</th>
                          <th>Option</th>
                          <th>Add</th>
                      </thead>
                    <tbody id="unregisteredMountedCourses">

                    </tbody>
                  </table>
                  </div> 
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
      );
      
      const doc = document.getElementById(elementId);
      doc.appendChild(temp);

      let closeModel = async(evt:Event)=>{
        evt.preventDefault();
        doc.removeChild(temp);
      };

      let accept = async(evt:Event)=>{
        //evt.preventDefault();
        this._vm.aproveRegistration(this.indexNumber);
        doc.removeChild(temp);
      };

      document.getElementById("accept").onclick = accept;
      document.getElementById("close").onclick = closeModel;

      let expandTable = (evt:Event) =>{
        let element = (evt.target as HTMLAnchorElement);
        element.removeAttribute("class");
        element.setAttribute("class","fa fa-minus");        
        element.setAttribute("style", "display:inline");       
      }
      

      let colapseTable = (evt: Event) => {
      let element = (evt.target as HTMLAnchorElement);
      element.removeAttribute("class");
      element.setAttribute("class","fa fa-plus");       
      }    
    }   
  }
