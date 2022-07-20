import { bindable } from "aurelia";
import { Component } from "./component";

export class Checkbox extends Component {
    @bindable value: boolean = false;
    @bindable size: "xs" | "s" | "m" = "m";
    @bindable mode: "regular" | "angled" = "regular";
    @bindable readonly: boolean = false;

    toggle = () => {
        if (this.readonly) return;
        this.value = !this.value;
    }
}