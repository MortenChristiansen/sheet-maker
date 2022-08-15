import { updateBelongings } from "../actions/sheetActions";
import { Belongings } from "../types";
import { Widget } from "./widget";

export class VisBlock extends Widget<Belongings> {
    constructor() {
        super(state => state.character?.belongings, updateBelongings);
    }

    itemAdded = (name: string) => {
        if (!this.model) this.model = { carried: '', inSanctum: '', vis: [] };
        if (!this.model.vis) this.model.vis = [];
        this.model.vis.push({ name,  amountInLab: 0, amountOnPerson: 0, income: '', notes: '' });
        this.model.vis.sort((a, b) => a.name.localeCompare(b.name));
    }
}