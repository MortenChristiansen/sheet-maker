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
            modifiers: this.createModifiers(),
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
            modifiers: this.createModifiers(),
            notes: '',
            type: 'Flaw'
            });
        this.model.flaws.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Name each modifier after its column right away, since modifiers without a name are read-only
    private createModifiers() {
        return this.model.availableModifiers.map(m => ({ name: m.name, rating: 0 }));
    }

    modifierAdded = (name: string) => {
        this.model.availableModifiers.push({ name });
    }
}