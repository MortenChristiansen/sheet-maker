import { StateHistory, Store } from "@aurelia/store-v1";
import { updateSpells } from "../actions/sheetActions";
import { Spell, State } from "../types";
import { Widget } from "./widget";

export class SpellList extends Widget<Spell[]> {

    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.spells, updateSpells);
    }

    newSpellText: string = '';

    // TODO: Avoid loss of focus when editing spell

    keyPressed = (event: KeyboardEvent) => {
        if (event.key == "Enter" && this.newSpellText) {
            this.model.push({
                name: this.newSpellText,
                level: 0,
                xp: 0,
                arts: '',
                attunement: '',
                attunementBonus: 0,
                duration: '',
                focus: false,
                ritual: false,
                masteries: '',
                masteryLevel: 0,
                notes: '',
                pageNumber: '',
                prerequisites: '',
                range: '',
                sigil: '',
                sourceBook: 'Core',
                target: '',
                castingTotal: 0
             });
             this.model.sort((a, b) => a.name.localeCompare(b.name));
            this.newSpellText = '';
        }
    }
}