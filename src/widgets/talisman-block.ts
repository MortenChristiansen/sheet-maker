import { StateHistory, Store } from "@aurelia/store-v1";
import { updateTalisman } from "../actions/sheetActions";
import { State, Talisman } from "../types";
import { Widget } from "./widget";

export class TalismanBlock extends Widget<Talisman> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.talisman, updateTalisman);
    }

    bonusAdded = (bonus: string) => {
        this.model.bonuses.push({
            name: bonus,
            bonus: 1,
            instilled: false,
            source: '',
            notes: ''
        });
        this.model.bonuses.sort((a, b) => a.name.localeCompare(b.name));
    }

    effectAdded = (effect: string) => {
        this.model.effects.push({
            name: effect,
            arts: '',
            description: '',
            duration: '',
            level: 1,
            penetration: 0,
            range: '',
            target: '',
            usages: ''
        });
        this.model.effects.sort((a, b) => a.name.localeCompare(b.name));
    }
}