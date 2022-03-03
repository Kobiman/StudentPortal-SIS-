import { createElement } from "tsx-create-element";
import { _ } from "../../group";
import { IView } from "../../IView";
import { PagesVm } from "../../viewModels/pagesVm";
import { PagesModal } from "./pagesModal";


export class PagesView implements IView {
    constructor(private _vm: PagesVm) {

    }
    async oninitialized(): Promise<void> {
        await this._vm.getPages();
    }
    render(elementId: string): void {
        var temp = (
            <div class="sp-box">
                <div class="mc-row">
                    <h1>Pages View </h1>
                                 
                    <div class="mountcourses-form">
                        <div class="permission-filter">
                            <div id="pagesSearch">
                                <input type="text" name="answer" placeholder="search here." autofocus onkeyup={() => {
                                    this.tableSearch();  
                                }} id="searchPagesByTitle" />
                                 
                            </div>
                            <div class="sp-btn-row">
                                <button class="sp-btn sp-btn-default" id="addPages" onClick={(evt: Event) => {
                                        evt.preventDefault();  
                                    new PagesModal(this._vm).render("route-outlet");
                                        }}>
                                Add
                                </button>
                            </div>                             
                            </div>
                            <div>
                            <table class="table-hd" id="pagesViewHead">
                            <thead>
                                <th>No.</th>
                                <th>Title</th>
                                <th>Route</th>
                                <th>Edit</th>
                            </thead>
                            </table>
                            <div class="horizontal-edit">
                                <table class="table css-serial" id="pagesView">
                                    <thead hidden>
                                        <tr>
                                            <th>No.</th>
                                            <th>Title</th>
                                            <th>Route</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                <tbody id="userPages"> 
                                  {
                                    this._vm.userPages.map(x => <tr>
                                        <td></td>
                                        <td>{x.title}</td>
                                        <td>{x.route}</td>
                                        <td><button class="sp-btn td-btn"
                                                onClick={(evt: Event) => {
                                                evt.preventDefault();
                                                let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                                                const userId = row.cells[2].innerText;
                                                 new PagesModal(this._vm).render("route-outlet");
                                                }}
                                            >
                                            <i class="fas fa-edit"> </i>
                                            Edit
                                        </button>               
                                        </td>
                                    </tr>)
                                }      
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
        _.syncTable("pagesViewHead", "pagesView");
    }
    tableSearch() {
      let input, filter, table, tr, td, txtValue;
      input = document.getElementById("searchPagesByTitle");
      filter = input.value.toUpperCase();
      table = document.getElementById("userPages");
      tr = table.querySelectorAll("tr");
      for (let i = 0; i < tr.length; ++i) {
        td = tr[i].cells[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          }
          else {
            tr[i].style.display = "none";
          }
        }
        }
        // countLecturer();
      }
}
