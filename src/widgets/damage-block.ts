import { updatePhysicalStatus } from "../actions/sheetActions";
import { PhysicalStatus } from "../types";
import { Widget } from "./widget";

export class DamageBlock extends Widget<PhysicalStatus> {
    constructor() {
        super(state => state.character?.physicalStatus, updatePhysicalStatus);
    }
}