import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateSpellcastingStats } from "../actions/sheetActions";
import { SpellcastingStats, State } from "../types";
import { Widget } from "./widget";

export class SpellcastingModifiersBlock extends Widget<SpellcastingStats> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.spellcastingStats, updateSpellcastingStats, ea);
    }
}