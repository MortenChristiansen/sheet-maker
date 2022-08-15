import { Widget } from "./widget";
import { Ageing } from "../types";
import { updateAgeing } from "../actions/sheetActions";

export class AgeBlock extends Widget<Ageing> {
    constructor() {
        super(s => s.character?.ageing, updateAgeing);
    }
}