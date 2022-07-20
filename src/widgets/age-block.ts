import { Widget } from "./widget";
import { Ageing, State } from "../types";
import { StateHistory, Store } from "@aurelia/store-v1";
import { updateAgeing } from "../actions/sheetActions";

export class AgeBlock extends Widget<Ageing> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, s => s.character?.ageing, updateAgeing);
    }
}