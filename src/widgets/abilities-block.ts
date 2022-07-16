import { StateHistory, Store } from "@aurelia/store-v1";
import { updateAbilities } from "../actions/sheetActions";
import { Ability, State } from "../types";
import { Widget } from "./widget";

export class AbilitiesBlock extends Widget<Ability[]> {
    newItemText: string = '';

    constructor(store: Store<StateHistory<State>>) {
        super(store, s => s.character?.abilities, updateAbilities);
    }

    keyPressed = (event: KeyboardEvent) => {
        if (event.key == "Enter" && this.newItemText) {
            this.model.push({ name: this.newItemText, specialisation: '', level: 0, xp: 0, puissant: false });
             this.model.sort((a, b) => a.name.localeCompare(b.name));
             this.newItemText = '';
        }
    }
}