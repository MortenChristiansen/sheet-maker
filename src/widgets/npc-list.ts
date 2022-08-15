import { StateHistory, Store } from "@aurelia/store-v1";
import { updateNpcs } from "../actions/sheetActions";
import { Npc, State } from "../types";
import { Widget } from "./widget";

export class NpcList extends Widget<Npc[]> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.npcs, updateNpcs);
    }

    npcAdded = (name: string) => {
        if (!this.model) this.model = [];
        this.model.push({
            name: name,
            description: '',
            additionalInfo: ''
        });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }
}