import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateSpells, updateSpellWishlist } from "../actions/sheetActions";
import { Spell, State } from "../types";
import { Widget } from "./widget";

export class SpellWishlist extends Widget<Spell[]> {

    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.spellWishlist, updateSpellWishlist, ea);
    }

    spellAdded = (spell: string) => {
        if (!this.model) this.model = [];
        this.model.push({
            name: spell,
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
            castingTotal: 0,
            onWishlist: true
        });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }

    learnSpell = (spell: Spell) => {
        spell.onWishlist = false;
    }
}