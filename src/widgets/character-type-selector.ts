import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateCharacterType } from "../actions/sheetActions";
import { State } from "../types";
import { Widget } from "./widget";

export class CharacterTypeSelector extends Widget<"magus" | "companion"> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.type, updateCharacterType, ea);
    }

    bound() {
        super.bound();

        this.ea.subscribe<{ group: string, source: Element, value: string }, 'radio-button-selected'>('radio-button-selected', payload => {
            if (payload.group == "character-type") {
                this.model = payload.value as "magus" | "companion";
            }
        });
    }
}