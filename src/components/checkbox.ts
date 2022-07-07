import { bindable } from "aurelia";
import { Component } from "./component";

export class Checkbox extends Component {
    @bindable state: "checked"|"unchecked" = "unchecked";

    toggle = () => {
        this.state = this.state == "checked" ? "unchecked" : "checked";
    }
}