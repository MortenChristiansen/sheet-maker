import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateBelongings } from "../actions/sheetActions";
import { Belongings, State } from "../types";
import { Widget } from "./widget";

export class SanctumBelongingsBlock extends Widget<Belongings> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.belongings, updateBelongings, ea);
    }
}