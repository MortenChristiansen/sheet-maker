import { updateFatigue } from "../actions/sheetActions";
import { PhysicalStatus } from "../types";
import { SubWidget } from "./widget";

export class FatigueBlock extends SubWidget<PhysicalStatus, number> {
    constructor() {
        super(state => state.character?.physicalStatus, b => b.fatigue, (m, s) => m.fatigue = s, updateFatigue);
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