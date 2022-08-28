import { containerless } from "aurelia";
import { updateFlaws } from "../actions/sheetActions";
import { Flaw } from "../types";
import { Widget } from "./widget";

@containerless
export class FlawsList extends Widget<Flaw[]> {
    constructor() {
        super(state => state.character?.flaws, updateFlaws);
    }

    transformModel(model: Flaw[]) {
        while (model.length < 13) {
            model.push({ name: '', additionalInfo: '' });
        }
        if (model.length > 13) return model.slice(0, 13);
        return model;
    }
}