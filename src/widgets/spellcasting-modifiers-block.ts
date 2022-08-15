import { updateSpellcastingStats } from "../actions/sheetActions";
import { SpellcastingStats } from "../types";
import { Widget } from "./widget";

export class SpellcastingModifiersBlock extends Widget<SpellcastingStats> {
    constructor() {
        super(state => state.character?.spellcastingStats, updateSpellcastingStats);
    }

    get showGoodCycle() {
        return this.model.cyclicMagicVirtue || this.model.cyclicMagicFlaw;
    }
}