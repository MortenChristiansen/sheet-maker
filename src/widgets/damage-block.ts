import { updateWounds } from "../actions/sheetActions";
import { PhysicalStatus, Wounds } from "../types";
import { SubWidget } from "./widget";

export class DamageBlock extends SubWidget<PhysicalStatus, Wounds> {
    constructor() {
        super(state => state.character?.physicalStatus, s => s.wounds, (m, s) => m.wounds = s, updateWounds);
    }
}