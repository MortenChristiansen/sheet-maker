import { StateHistory, Store } from "@aurelia/store-v1";
import { updateFlaws } from "../actions/sheetActions";
import { Flaw, State } from "../types";
import { Widget } from "./widget";

export class FlawsList extends Widget<Flaw[]> {

    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.flaws, updateFlaws);
    }
}