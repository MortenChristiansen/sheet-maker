import { StateHistory, Store } from "@aurelia/store-v1";
import { getLabModifierTotals, updateLab } from "../actions/sheetActions";
import { Lab, LabModifier, State } from "../types";
import { Widget } from "./widget";

export class LabModificationsList extends Widget<Lab> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.lab, updateLab);
    }

    newVirtueText: string = '';
    newFlawText: string = '';
    newModifierText: string = '';

    get totals() {
        if (!this.model) return [];
        return getLabModifierTotals(this.model).map(x => x.rating);
    }

    keyPressed = (event: KeyboardEvent, type: string) => {
        if (event.key == "Enter") {
            if (type == 'virtue' && this.newVirtueText) {
                this.model.virtues.push({
                    name: this.newVirtueText,
                    category: 'Outfitting',
                    cost: 0,
                    modifiers: [],
                    notes: '',
                    type: 'Virtue'
                 });
                 this.model.virtues.sort((a, b) => a.name.localeCompare(b.name));
                this.newVirtueText = '';
            }

            if (type == 'flaw' && this.newFlawText) {
                this.model.flaws.push({
                    name: this.newFlawText,
                    category: 'Outfitting',
                    cost: 0,
                    modifiers: [],
                    notes: '',
                    type: 'Flaw'
                 });
                this.model.flaws.sort((a, b) => a.name.localeCompare(b.name));
                this.newFlawText = '';
            }

            if (type == 'modifier' && this.newModifierText) {
                this.model.availableModifiers.push({ name: this.newModifierText });
                this.newModifierText = '';
            }
        }
    }
}