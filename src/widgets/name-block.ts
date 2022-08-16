import { updateDescription } from "../actions/sheetActions";
import { CharacterDescription } from "../types";
import { Widget } from "./widget";

export class NameBlock extends Widget<CharacterDescription> {
    constructor() {
        super(state => state.character?.description, updateDescription);
    }
}