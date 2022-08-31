import { updateLab } from "../actions/sheetActions";
import { Lab } from "../types";
import { Widget } from "./widget";

export class LabBase extends Widget<Lab> {
    constructor() {
        super(state => state.character?.lab, updateLab);
    }

    private modifierCount = 15;

    transformModel(model: Lab) {
        while (model.availableModifiers.length < this.modifierCount) {
            model.availableModifiers.push({ name: '' });
        }
        if (model.availableModifiers.length > this.modifierCount) model.availableModifiers = model.availableModifiers.slice(0, this.modifierCount);

        model.flaws.concat(model.virtues).forEach(f => {
            while (f.modifiers.length < this.modifierCount) {
                f.modifiers.push({ name: '', rating: 0 });
            }
            if (f.modifiers.length > this.modifierCount) f.modifiers = f.modifiers.slice(0, this.modifierCount);
        });
        return model;
    }
}