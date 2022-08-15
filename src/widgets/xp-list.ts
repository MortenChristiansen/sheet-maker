import { StateHistory, Store } from "@aurelia/store-v1";
import { updateXpEntries } from "../actions/sheetActions";
import { State, XpEntry } from "../types";
import { Widget } from "./widget";

export class XpList extends Widget<XpEntry[]> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.xpEntries, updateXpEntries);
    }

    get planningEntries() {
        if (!this.model) return [];
        return this.model.filter(x => x.planningMode);
    }

    get pastEntries() {
        if (!this.model) return [];
        return this.model.filter(x => !x.planningMode);
    }

    deletePreviousEntries = () => {
        let currentYear = this.state.present.character.ageing.currentYear;
        this.model = this.model.filter(m => m.year >= currentYear);
    }
}