import { createElement } from "tsx-create-element";
export class HtmlSelect{
    static create(value,option,binding?,placeholder?){
       return (<select binding={binding} value={value}>
                    <option>{placeholder}</option>
                    {
                        option
                    }
       </select>);
    }
}