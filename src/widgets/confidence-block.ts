import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateConfidence } from "../actions/sheetActions";
import { Confidence, State } from "../types";
import { Widget } from "./widget";

export class ConfidenceBlock extends Widget<Confidence> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.confidence, updateConfidence, ea);
    }
}