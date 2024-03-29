import { updateNpcs } from "../actions/sheetActions";
import { Npc } from "../types";
import { Widget } from "./widget";

export class NpcList extends Widget<Npc[]> {
    constructor() {
        super(state => state.character?.npcs, updateNpcs);
    }

    npcAdded = (name: string) => {
        if (!this.model) this.model = [];
        this.model.push({
            name,
            description: '',
            additionalInfo: ''
        });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }

    transformModel(model: Npc[]) {
        while (model.length < 20) {
            model.push({
                name: '',
                description: '',
                additionalInfo: ''
            });
        }
        if (model.length > 20) return model.slice(0, 20);
        return model;
    }
}