import { updateAbilities } from "../actions/sheetActions";
import { Ability } from "../types";
import { Widget } from "./widget";

export class AbilitiesBlock extends Widget<Ability[]> {
    constructor() {
        super(s => s.character?.abilities, updateAbilities);
    }

    itemAdded = (name: string) => {
        this.model.push({ name, specialisation: '', level: 0, xp: 0, puissant: false });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }
}