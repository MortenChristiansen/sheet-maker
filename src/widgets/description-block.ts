import { updateDescription } from "../actions/sheetActions";
import { CharacterDescription } from "../types";
import { SubWidget } from "./widget";

export class DescriptionBlock extends SubWidget<CharacterDescription, string> {
    constructor() {
        super(state => state.character?.description, b => b.description, (m, s) => m.description = s, updateDescription);
    }
}