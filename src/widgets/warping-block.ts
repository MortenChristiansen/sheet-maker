import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateWarping } from "../actions/sheetActions";
import { State, Warping } from "../types";
import { Widget } from "./widget";

export class WarpingBlock extends Widget<Warping> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.warping, updateWarping, ea);
    }

    newEffectText: string = '';

    keyPressed = (event: KeyboardEvent) => {
        if (event.key == "Enter" && this.newEffectText) {
            this.model.ongoingEffects.push({
                name: this.newEffectText,
                warpingPointsPerYear: 1
             });
             this.model.ongoingEffects.sort((a, b) => a.name.localeCompare(b.name));
            this.newEffectText = '';
        }
    }
}