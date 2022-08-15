import { updateLab } from "../actions/sheetActions";
import { Lab } from "../types";
import { Widget } from "./widget";

export class LabStats extends Widget<Lab> {
    constructor() {
        super(state => state.character?.lab, updateLab);
    }
}