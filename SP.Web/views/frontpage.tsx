import { createElement } from "tsx-create-element";
import { IView } from "../IView";
import { App } from "../app";
import { FrontPageVm } from "../viewModels/frontpageVm";
import { BallLoader } from "../loader/ballLoader";
export class FrontPageView implements IView {
  constructor(private _vm: FrontPageVm) { }
  async oninitialized() {
  }


  render = (elementId: string) => {
    let temp = (
      <div class="showcase">
        <h2 class="front-header">
          UMIS
        </h2>
        <div class="sp-container sp-container-bg">
          <h1>Training the next generation of experts</h1>
          <p>Providing cutting-edge research to support Ghana and Africa’s development on energy and natural resources.</p>
          <div>
            <img src="../assets/uenrBook2.png" class="front-book"alt="" />
          </div>
              <button class=" sp-btn-primay-3" id="signin" onClick={(evt: Event) => {
                BallLoader.show();
            evt.preventDefault();
            this._vm.signIn();
            
          }}>
             
            <span>Sign in</span>
          </button>
        </div>
      </div>
     
    );
    let state = false;
    function toggle() {
      if (state) {
        document.getElementById("loginPassword").setAttribute("type", "password")
        document.getElementById("eye").style.color = "#000000";
        state = false;
      }
      else {
        document.getElementById("loginPassword").setAttribute("type", "text")
        document.getElementById("eye").style.color = "#2bab0d";
        state = true;

      }
    }
    var doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    // var btn = document.getElementById("signin");

    // btn.addEventListener("click", (evt: Event) => {
    //   evt.preventDefault();
    //   App.navigate("/app/#addStudent/stage1");
    //   // /app/#addStudent/stage1
    // });
  };
}
