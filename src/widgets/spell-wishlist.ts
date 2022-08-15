import { updateSpellWishlist } from "../actions/sheetActions";
import { Spell } from "../types";
import { Widget } from "./widget";

export class SpellWishlist extends Widget<Spell[]> {

    constructor() {
        super(state => state.character?.spellWishlist, updateSpellWishlist);
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
            additionalInfo: '',
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