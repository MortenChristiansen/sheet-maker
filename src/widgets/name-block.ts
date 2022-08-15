import { StateHistory, Store } from "@aurelia/store-v1";
import { containerless } from "aurelia";
import { updateDescription } from "../actions/sheetActions";
import { CharacterDescription, State } from "../types";
import { Widget } from "./widget";

@containerless
export class NameBlock extends Widget<CharacterDescription> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.description, updateDescription);
    }
}