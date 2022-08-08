import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updatePhysicalStatus } from "../actions/sheetActions";
import { PhysicalStatus, State } from "../types";
import { Widget } from "./widget";

export class PhysicalPenaltyBlock extends Widget<PhysicalStatus> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.physicalStatus, updatePhysicalStatus, ea);
    }
}