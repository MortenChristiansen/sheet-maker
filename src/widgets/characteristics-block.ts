import { StateHistory, Store } from "@aurelia/store-v1";
import { updateCharacteristics } from "../actions/sheetActions";
import { Characteristics, State } from "../types";
import { Widget } from "./widget";

export class CharacteristicsBlock extends Widget<Characteristics> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.characteristics, updateCharacteristics);
    }
}