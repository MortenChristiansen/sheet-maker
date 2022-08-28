import { bindable } from "aurelia";

export class Decoration {
    @bindable mode: "bottles" | "cross" | "gargoyle" | "griffon" | "h-diamond" | "v-diamond" | "square";
}