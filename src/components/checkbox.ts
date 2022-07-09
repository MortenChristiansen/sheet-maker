import { bindable } from "aurelia";
import { Component } from "./component";

export class Checkbox extends Component {
    @bindable value: boolean = false;
    @bindable size: "xs" | "s" | "m" = "m";
    @bindable mode: "regular" | "angled" = "regular";

    toggle = () => {
        this.value = !this.value;
    }
}