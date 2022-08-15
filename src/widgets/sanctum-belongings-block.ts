import { updateSanctumBelongings } from "../actions/sheetActions";
import { Belongings } from "../types";
import { SubWidget } from "./widget";

export class SanctumBelongingsBlock extends SubWidget<Belongings, string> {
    constructor() {
        super(state => state.character?.belongings, b => b.inSanctum, (b, s) => b.inSanctum = s, updateSanctumBelongings);
    }
}