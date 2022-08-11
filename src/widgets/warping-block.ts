import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateWarping } from "../actions/sheetActions";
import { State, Warping } from "../types";
import { Widget } from "./widget";

export class WarpingBlock extends Widget<Warping> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.warping, updateWarping, ea);
    }

    itemAdded = (name: string) => {
        this.model.ongoingEffects.push({
            name,
            warpingPointsPerYear: 1
        });
        this.model.ongoingEffects.sort((a, b) => a.name.localeCompare(b.name));
    }
}