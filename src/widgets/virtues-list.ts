import { StateHistory, Store } from "@aurelia/store-v1";
import { updateVirtues } from "../actions/sheetActions";
import { State, Virtue } from "../types";
import { Widget } from "./widget";

export class VirtuesList extends Widget<Virtue[]> {

    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.virtues, updateVirtues);
    }
}