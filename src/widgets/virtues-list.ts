import { containerless } from "aurelia";
import { updateVirtues } from "../actions/sheetActions";
import { Virtue } from "../types";
import { Widget } from "./widget";

@containerless
export class VirtuesList extends Widget<Virtue[]> {
    constructor() {
        super(state => state.character?.virtues, updateVirtues);
    }

    transformModel(model: Virtue[]) {
        while (model.length < 13) {
            model.push({ name: '', additionalInfo: '' });
        }
        if (model.length > 13) return model.slice(0, 13);
        return model;
    }
}