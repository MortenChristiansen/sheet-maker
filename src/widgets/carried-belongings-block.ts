import { updateCarriedBelongings } from "../actions/sheetActions";
import { Belongings } from "../types";
import { SubWidget } from "./widget";

export class CarriedBelongingsBlock extends SubWidget<Belongings, string> {
    constructor() {
        super(state => state.character?.belongings, b => b.carried, (b, s) => b.carried = s, updateCarriedBelongings);
    }
}