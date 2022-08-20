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
        while (model.length < 15) {
            model.push({ name: '', additionalInfo: '' });
        }
        return model;
    }
}