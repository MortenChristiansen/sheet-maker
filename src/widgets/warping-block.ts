import { StateHistory, Store } from "@aurelia/store-v1";
import { updateWarping } from "../actions/sheetActions";
import { State, Warping } from "../types";
import { Widget } from "./widget";

export class WarpingBlock extends Widget<Warping> {
    constructor(store: Store<StateHistory<State>>) {
        super(store, state => state.character?.warping, updateWarping);
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