import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateArts } from "../actions/sheetActions";
import { Arts, State } from "../types";
import { Widget } from "./widget";

export class ArtsBlock extends Widget<Arts> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, s => s.character?.arts, updateArts, ea);
    }
}