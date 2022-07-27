import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateXpEntries } from "../actions/sheetActions";
import { State, XpEntry } from "../types";
import { Widget } from "./widget";

export class XpList extends Widget<XpEntry[]> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.xpEntries, updateXpEntries, ea);
    }

    get planningEntries() {
        if (!this.model) return [];
        return this.model.filter(x => x.planningMode);
    }

    get pastEntries() {
        if (!this.model) return [];
        return this.model.filter(x => !x.planningMode);
    }
}