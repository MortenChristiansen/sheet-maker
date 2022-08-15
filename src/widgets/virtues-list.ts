import { updateVirtues } from "../actions/sheetActions";
import { Virtue } from "../types";
import { Widget } from "./widget";

export class VirtuesList extends Widget<Virtue[]> {
    constructor() {
        super(state => state.character?.virtues, updateVirtues);
    }
}