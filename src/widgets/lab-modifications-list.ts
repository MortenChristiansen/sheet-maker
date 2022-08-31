import { getLabModifierTotals } from "../actions/sheetActions";
import { LabBase } from "./lab-base";

export class LabModificationsList extends LabBase {
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
}