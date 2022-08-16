import { PhysicalStatus } from "../types";
import { Widget } from "./widget";

export class PhysicalPenaltyBlock extends Widget<PhysicalStatus> {
    constructor() {
        super(state => state.character?.physicalStatus, null);
    }
}