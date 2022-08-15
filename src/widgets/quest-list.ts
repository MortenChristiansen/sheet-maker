import { updateQuests } from "../actions/sheetActions";
import { Quest } from "../types";
import { Widget } from "./widget";

export class QuestList extends Widget<Quest[]> {
    constructor() {
        super(state => state.character?.quests, updateQuests);
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