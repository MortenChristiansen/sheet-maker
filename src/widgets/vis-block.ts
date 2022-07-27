import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateBelongings } from "../actions/sheetActions";
import { Belongings, State } from "../types";
import { Widget } from "./widget";

export class VisBlock extends Widget<Belongings> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.belongings, updateBelongings, ea);
    }

    newItemText: string = '';

    keyPressed = (event: KeyboardEvent) => {
        if (event.key == "Enter" && this.newItemText) {
            if (!this.model) this.model = { carried: '', inSanctum: '', vis: [] };
            if (!this.model.vis) this.model.vis = [];
            this.model.vis.push({ name: this.newItemText,  amountInLab: 0, amountOnPerson: 0, income: '', notes: '' });
            this.model.vis.sort((a, b) => a.name.localeCompare(b.name));
            this.newItemText = '';
        }
    }
}