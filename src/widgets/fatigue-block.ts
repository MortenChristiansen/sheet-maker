import { updatePhysicalStatus } from "../actions/sheetActions";
import { PhysicalStatus } from "../types";
import { Widget } from "./widget";

export class FatigueBlock extends Widget<PhysicalStatus> {
    
    constructor() {
        super(state => state.character?.physicalStatus, updatePhysicalStatus);
    }

    bound() {
        super.bound();

        this.ea.subscribe<{ group: string, source: Element, value: string }, 'radio-button-selected'>('radio-button-selected', payload => {
            if (payload.group == "fatigue") {
                this.model.fatigue = Number.parseInt(payload.value);
            }
        });
    }
}