import { bindable } from "aurelia";

export class Checkbox {
    @bindable state: "checked"|"unchecked";

    toggle = () => {
        this.state = this.state == "checked" ? "unchecked" : "checked";
    }
}