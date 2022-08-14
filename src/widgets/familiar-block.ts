import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateFamiliar } from "../actions/sheetActions";
import { Familiar, State } from "../types";
import { Widget } from "./widget";

export class FamiliarBlock extends Widget<Familiar> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.familiar, updateFamiliar, ea);
    }

    itemAdded = (name: string) => {
        this.model.effects.push({
            name,
            arts: '',
            description: '',
            duration: '',
            level: 0,
            penetration: 0,
            range: '',
            target: '',
            usages: ''
        });
        this.model.effects.sort((a, b) => a.name.localeCompare(b.name));
    }
}