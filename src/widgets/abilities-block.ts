import { StateHistory, Store } from "@aurelia/store-v1";
import { updateAbilities } from "../actions/sheetActions";
import { Ability, State } from "../types";
import { Widget } from "./widget";

export class AbilitiesBlock extends Widget<Ability[]> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, s => s.character?.abilities, updateAbilities);
    }

    itemAdded = (name: string) => {
        this.model.push({ name, specialisation: '', level: 0, xp: 0, puissant: false });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }
}