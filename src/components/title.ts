import { bindable } from "aurelia";
import { Component } from "./component";

export class Title extends Component {
    @bindable text: string;
}