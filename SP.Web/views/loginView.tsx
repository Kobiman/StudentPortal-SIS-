import { createElement } from "tsx-create-element";
import { IView } from "../IView";
import { LoginVm } from "../viewModels/loginVm";
export class loginView implements IView {
  
  constructor(private _vm: LoginVm) { }
  async oninitialized(): Promise<void> {
  }
  render = (elementId: string) => {
    
    let temp = (
    //<div class="sp-box">
   // <div class="mc-row">
    //<div class="container">
        <div class="wrapper" id="login-wrapper">
          <form action="" class="login-form">
          <img src="../assets/uenr-logo-768x998.png" alt="" />
          <h2>Login</h2>
          <div class="input-group">
            <input type="text" name="loginUser" id="loginUser" required />
            <label for="loginUser">User Name</label>

          </div>
          <div class="input-group">
          <input type="password" name="loginPassword" id="loginPassword" required/>
          <label for="loginPassword">Password</label>
            

          </div>
          <input value="Login" class="submit-btn" onClick={(evt: Event) => {
                       evt.preventDefault();
                      this._vm.signIn();
                    }} ></input>
          <a href="#forgot-password" class="forgot-password">Forgot Password?</a>

          </form>
         
          <div id="forgot-password">
            <form action="" class="login-form">
            <a href="#" class="close">&times;</a>
            <h2>Reset Password</h2>
            <div class="input-group">
            <input type="email" name="email" id="email" required></input>
            <label for="email">Email</label>

            </div>
            <input type="submit" value="Submit" class="submit-btn"></input>

            </form>

          </div>
        </div>
    //</div>

    //</div>
    //</div>

    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);
  }
}