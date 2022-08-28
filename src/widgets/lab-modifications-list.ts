import { getLabModifierTotals, updateLab } from "../actions/sheetActions";
import { Lab } from "../types";
import { Widget } from "./widget";

export class LabModificationsList extends Widget<Lab> {
    constructor() {
        super(state => state.character?.lab, updateLab);
    }

    get totals() {
        if (!this.model) return [];
        return getLabModifierTotals(this.model).map(x => x.rating);
    }

    virtueAdded = (name: string) => {
        this.model.virtues.push({
            name,
            category: 'Outfitting',
            cost: 0,
            modifiers: [],
            notes: '',
            type: 'Virtue'
        });
        this.model.virtues.sort((a, b) => a.name.localeCompare(b.name));
    }

    flawAdded = (name: string) => {
        this.model.flaws.push({
            name,
            category: 'Outfitting',
            cost: 0,
            modifiers: [],
            notes: '',
            type: 'Flaw'
            });
        this.model.flaws.sort((a, b) => a.name.localeCompare(b.name));
    }

    modifierAdded = (name: string) => {
        this.model.availableModifiers.push({ name });
    }

    transformModel(model: Lab) {
        while (model.availableModifiers.length < 12) {
            model.availableModifiers.push({ name: '' });
        }
        if (model.availableModifiers.length > 12) model.availableModifiers = model.availableModifiers.slice(0, 12);

        model.flaws.concat(model.virtues).forEach(f => {
            while (f.modifiers.length < 12) {
                f.modifiers.push({ name: '', rating: 0 });
            }
            if (f.modifiers.length > 12) f.modifiers = f.modifiers.slice(0, 12);
        });
        return model;
    }
}