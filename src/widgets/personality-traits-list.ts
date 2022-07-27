import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updatePersonalityTraits } from "../actions/sheetActions";
import { PersonalityTrait, State } from "../types";
import { Widget } from "./widget";

export class PersonalityTraitsList extends Widget<PersonalityTrait[]> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.personalityTraits, updatePersonalityTraits, ea);
    }

    newTraitText: string = '';

    keyPressed = (event: KeyboardEvent) => {
        if (event.key == "Enter" && this.newTraitText) {
            this.model.push({ name: this.newTraitText, rating: 0 });
             this.model.sort((a, b) => a.name.localeCompare(b.name));
             this.newTraitText = '';
        }
    }
}