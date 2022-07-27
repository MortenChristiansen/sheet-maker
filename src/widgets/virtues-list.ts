import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateVirtues } from "../actions/sheetActions";
import { State, Virtue } from "../types";
import { Widget } from "./widget";

export class VirtuesList extends Widget<Virtue[]> {

    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.virtues, updateVirtues, ea);
    }
}