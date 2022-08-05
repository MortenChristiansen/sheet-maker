import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateNpcs } from "../actions/sheetActions";
import { Npc, State } from "../types";
import { Widget } from "./widget";

export class NpcList extends Widget<Npc[]> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.npcs, updateNpcs, ea);
    }

    npcAdded = (name: string) => {
        if (!this.model) this.model = [];
        this.model.push({
            name: name,
            description: ''
        });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }
}