import { updateActiveMagic } from "../actions/sheetActions";
import { ActiveMagic } from "../types";
import { Widget } from "./widget";

export class ActiveMagicList extends Widget<ActiveMagic[]> {
    constructor() {
        super(s => s.character?.activeMagic, updateActiveMagic);
    }

    itemAdded = (name: string) => {
        if (!this.model) this.model = [];
        this.model.push({
            name,
            penetration: 0,
            active: true,
            additionalInfo: ''
        });
        this.model.sort((a, b) => a.name.localeCompare(b.name));
    }

    transformModel(model: ActiveMagic[]) {
        while (model.length < 6) {
            model.push({
                name: '',
                penetration: 0,
                active: false,
                additionalInfo: ''
            });
        }
        if (model.length > 6) return model.slice(0, 6);
        return model;
    }
}