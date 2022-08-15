import { StateHistory, Store } from "@aurelia/store-v1";
import { updateActiveMagic } from "../actions/sheetActions";
import { ActiveMagic, State } from "../types";
import { Widget } from "./widget";

export class ActiveMagicList extends Widget<ActiveMagic[]> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, s => s.character?.activeMagic, updateActiveMagic);
    }

    itemAdded = (name: string) => {
        if (!this.model) this.model = [];
        this.model.push({
            name,
            penetration: 0,
            active: true,
            additionalInfo: ''
            });
            this.model.sort((a, b) => a.name.localeCompare(b.name));
    }
}