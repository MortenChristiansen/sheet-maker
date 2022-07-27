import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updatePhysicalStatus } from "../actions/sheetActions";
import { PhysicalStatus, State } from "../types";
import { Widget } from "./widget";

export class FatigueBlock extends Widget<PhysicalStatus> {
    
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.physicalStatus, updatePhysicalStatus, ea);
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