import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateLab } from "../actions/sheetActions";
import { Lab, State } from "../types";
import { Widget } from "./widget";

export class LabStats extends Widget<Lab> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.lab, updateLab, ea);
    }
}