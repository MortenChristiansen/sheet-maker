import { bindable } from "aurelia";

export class CrossButton {
    @bindable mode: "angled" | "standard" = "standard";
}