import { bindable } from "aurelia";
import { ColorMode } from "../types";

export class Checkbox {
    @bindable state: "checked"|"unchecked";
    @bindable colorMode: ColorMode;

    toggle = () => {
        this.state = this.state == "checked" ? "unchecked" : "checked";
    }
}