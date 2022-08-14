import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateSpells } from "../actions/sheetActions";
import { SpellDetailsDialog } from "../components/spell-details-dialog";
import { Spell, State } from "../types";
import { Widget } from "./widget";

export class SpellList extends Widget<Spell[]> {

    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.spells, updateSpells, ea);
    }

    spellAdded = (spell: string) => {
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
            additionalInfo: '',
            pageNumber: '',
            prerequisites: '',
            range: '',
            sigil: '',
            sourceBook: 'Core',
            target: '',
            castingTotal: 0,
            onWishlist: false
        });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }

    editDetails = (spell: Spell) => {
        SpellDetailsDialog.open(spell);
    }

    unlearnSpell = (spell: Spell) => {
        spell.onWishlist = true;
    }
}