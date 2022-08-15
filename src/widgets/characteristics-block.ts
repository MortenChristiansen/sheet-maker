import { updateCharacteristics } from "../actions/sheetActions";
import { Characteristics } from "../types";
import { Widget } from "./widget";

export class CharacteristicsBlock extends Widget<Characteristics> {
    constructor() {
        super(state => state.character?.characteristics, updateCharacteristics);
    }
}