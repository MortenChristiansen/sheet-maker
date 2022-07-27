import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateFlaws } from "../actions/sheetActions";
import { Flaw, State } from "../types";
import { Widget } from "./widget";

export class FlawsList extends Widget<Flaw[]> {

    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.flaws, updateFlaws, ea);
    }
}