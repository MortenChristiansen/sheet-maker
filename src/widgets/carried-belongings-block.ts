import { StateHistory, Store } from "@aurelia/store-v1";
import { updateBelongings } from "../actions/sheetActions";
import { Belongings, State } from "../types";
import { Widget } from "./widget";

export class CarriedBelongingsBlock extends Widget<Belongings> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.belongings, updateBelongings);
    }
}