import { updateCharacterType } from "../actions/sheetActions";
import { Widget } from "./widget";

export class CharacterTypeSelector extends Widget<"magus" | "companion"> {
    constructor() {
        super(state => state.character?.type, updateCharacterType);
    }

    bound() {
        super.bound();

        this.ea.subscribe<{ group: string, source: Element, value: string }, 'radio-button-selected'>('radio-button-selected', payload => {
            if (payload.group == "character-type") {
                this.model = payload.value as "magus" | "companion";
            }
        });
    }
}