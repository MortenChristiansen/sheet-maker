import { StateHistory, Store } from "@aurelia/store-v1";
import { updateMagicItems } from "../actions/sheetActions";
import { MagicItem, State } from "../types";
import { Widget } from "./widget";

export class MagicItemsBlock extends Widget<MagicItem[]> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.magicItems, updateMagicItems);
    }

    itemAdded = (name: string) => {
        if (!this.model) this.model = [];
        this.model.push({
            name: name,
            description: '',
            investedVis: 0,
            spentVis: 0,
            effects: []
        });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }

    effectAdded = (effect: string, magicItem: MagicItem) => {
        magicItem.effects.push({
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
        magicItem.effects.sort((a, b) => a.name.localeCompare(b.name));
    }
}