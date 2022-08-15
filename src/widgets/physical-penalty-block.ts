import { StateHistory, Store } from "@aurelia/store-v1";
import { updatePhysicalStatus } from "../actions/sheetActions";
import { PhysicalStatus, State } from "../types";
import { Widget } from "./widget";

export class PhysicalPenaltyBlock extends Widget<PhysicalStatus> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.physicalStatus, updatePhysicalStatus);
    }
}