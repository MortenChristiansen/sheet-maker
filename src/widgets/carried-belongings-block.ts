import { updateBelongings } from "../actions/sheetActions";
import { Belongings } from "../types";
import { Widget } from "./widget";

export class CarriedBelongingsBlock extends Widget<Belongings> {
    constructor() {
        super(state => state.character?.belongings, updateBelongings);
    }
}