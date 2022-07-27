import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateActiveMagic } from "../actions/sheetActions";
import { ActiveMagic, State } from "../types";
import { Widget } from "./widget";

export class ActiveMagicList extends Widget<ActiveMagic[]> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, s => s.character?.activeMagic, updateActiveMagic, ea);
    }

    newMagicText: string = '';

    keyPressed = (event: KeyboardEvent) => {
        if (!this.model) this.model = [];
        if (event.key == "Enter" && this.newMagicText) {
            this.model.push({
                name: this.newMagicText,
                penetration: 0,
                active: true
             });
             this.model.sort((a, b) => a.name.localeCompare(b.name));
            this.newMagicText = '';
        }
    }
}