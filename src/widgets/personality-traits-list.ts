import { updatePersonalityTraits } from "../actions/sheetActions";
import { PersonalityTrait } from "../types";
import { Widget } from "./widget";

export class PersonalityTraitsList extends Widget<PersonalityTrait[]> {
    constructor() {
        super(state => state.character?.personalityTraits, updatePersonalityTraits);
    }

    itemAdded = (name: string) => {
        this.model.push({ name, rating: 0 });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }
}