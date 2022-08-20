import { updatePersonalityTraits } from "../actions/sheetActions";
import { PersonalityTrait } from "../types";
import { Widget } from "./widget";

export class PersonalityTraitsList extends Widget<PersonalityTrait[]> {
    constructor() {
        super(state => state.character?.personalityTraits, updatePersonalityTraits);
    }

    transformModel(model: PersonalityTrait[]) {
        while (model.length < 10) {
            model.push({ name: '', rating: 0 });
        }
        return model;
    }
}