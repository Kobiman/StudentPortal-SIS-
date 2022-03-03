import { createElement } from "tsx-create-element";
import { Course } from "../../models/Course";

export class SelectedCourseView{
  constructor() {}
  render() {
    return (
      <tr>
        <td binding>
        <input binding="name" type="text" placeholder="Name" style="margin-bottom: 0px;" />
          <div errors="name"></div>
        </td>
        <td binding></td>
        <td binding>
        <input binding="name" type="text" placeholder="Name" style="margin-bottom: 0px;" />
          <div errors="name"></div>
        </td>
        <td>
        <label class="check-content margin-0">
                      Scoring
                      <input id="scoring" type="checkbox" checked={true} binding="SelectedCourse.scoring" value={true} />
                      <span class="checkmark"></span>
                    </label>
        </td>
        <td>
          <button class="sp-btn sp-btn-default btn-small" click="" binding value="">
            Add
          </button>
        </td>
      </tr>
    )
  }
}
