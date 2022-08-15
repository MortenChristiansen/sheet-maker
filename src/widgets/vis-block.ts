import { updateVis } from "../actions/sheetActions";
import { Belongings, Vis } from "../types";
import { SubWidget } from "./widget";

export class VisBlock extends SubWidget<Belongings, Vis[]> {
    constructor() {
        super(state => state.character?.belongings, b => b.vis, (b, s) => b.vis = s, updateVis);
    }

    itemAdded = (name: string) => {
        if (!this.model) this.model = { carried: '', inSanctum: '', vis: [] };
        if (!this.model.vis) this.model.vis = [];
        this.model.vis.push({ name,  amountInLab: 0, amountOnPerson: 0, income: '', notes: '' });
        this.model.vis.sort((a, b) => a.name.localeCompare(b.name));
    }
}