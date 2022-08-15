import { updateFamiliar } from "../actions/sheetActions";
import { Familiar } from "../types";
import { Widget } from "./widget";

export class FamiliarBlock extends Widget<Familiar> {
    constructor() {
        super(state => state.character?.familiar, updateFamiliar);
    }

    itemAdded = (name: string) => {
        this.model.effects.push({
            name,
            arts: '',
            description: '',
            duration: '',
            level: 0,
            penetration: 0,
            range: '',
            target: '',
            usages: ''
        });
        this.model.effects.sort((a, b) => a.name.localeCompare(b.name));
    }
}