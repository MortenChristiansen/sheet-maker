import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateQuests } from "../actions/sheetActions";
import { Quest, State } from "../types";
import { Widget } from "./widget";

export class QuestList extends Widget<Quest[]> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.quests, updateQuests, ea);
    }

    questAdded = (quest: string) => {
        if (!this.model) this.model = [];
        this.model.push({
            name: quest,
            focused: false,
            priority: 0,
            additionalInfo: ''
        });
        this.model.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => a.priority - b.priority);
    }
}