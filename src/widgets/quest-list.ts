import { updateQuests } from "../actions/sheetActions";
import { Quest } from "../types";
import { Widget } from "./widget";

export class QuestList extends Widget<Quest[]> {
    constructor() {
        super(state => state.character?.quests, updateQuests);
    }

    questAdded = (name: string) => {
        if (!this.model) this.model = [];
        this.model.push({
            name,
            focused: false,
            priority: 0,
            additionalInfo: ''
        });
        this.model.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => a.priority - b.priority);
    }

    transformModel(model: Quest[]) {
        while (model.length < 20) {
            model.push({
                name: '',
                focused: false,
                priority: 0,
                additionalInfo: ''
            });
        }
        if (model.length > 20) return model.slice(0, 20);
        return model;
    }
}