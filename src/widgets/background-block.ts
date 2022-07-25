import { StateHistory, Store } from "@aurelia/store-v1";
import { updateBackground } from "../actions/sheetActions";
import { State } from "../types";
import { Widget } from "./widget";

export class BackgroundBlock extends Widget<string> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.background, updateBackground);
    }
}