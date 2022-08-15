import { updateFlaws } from "../actions/sheetActions";
import { Flaw } from "../types";
import { Widget } from "./widget";

export class FlawsList extends Widget<Flaw[]> {
    constructor() {
        super(state => state.character?.flaws, updateFlaws);
    }
}