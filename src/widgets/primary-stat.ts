import { bindable } from "aurelia";

export class PrimaryStat {
    @bindable value: number = 0;
    @bindable max: number = 99;
    @bindable min: number = -99;
}