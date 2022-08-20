import { updateName } from "../actions/sheetActions";
import { CharacterDescription } from "../types";
import { SubWidget } from "./widget";

export class NameBlock extends SubWidget<CharacterDescription, string> {
    constructor() {
        super(state => state.character?.description, b => b.name, (m, s) => m.name = s, updateName);
    }
}