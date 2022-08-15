import { updateWarping } from "../actions/sheetActions";
import { Warping } from "../types";
import { Widget } from "./widget";

export class WarpingBlock extends Widget<Warping> {
    constructor() {
        super(state => state.character?.warping, updateWarping);
    }

    itemAdded = (name: string) => {
        this.model.ongoingEffects.push({
            name,
            warpingPointsPerYear: 1
        });
        this.model.ongoingEffects.sort((a, b) => a.name.localeCompare(b.name));
    }
}