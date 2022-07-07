import { bindable } from "aurelia";
import { ColorMode } from "../types";

export class Component {
    @bindable colorMode: ColorMode = "color";
}