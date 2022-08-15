import { containerless } from "aurelia";
import { updateDescription } from "../actions/sheetActions";
import { CharacterDescription } from "../types";
import { Widget } from "./widget";

@containerless
export class NameBlock extends Widget<CharacterDescription> {
    constructor() {
        super(state => state.character?.description, updateDescription);
    }
}