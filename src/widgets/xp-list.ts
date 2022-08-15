import { updateXpEntries } from "../actions/sheetActions";
import { XpEntry } from "../types";
import { Widget } from "./widget";

export class XpList extends Widget<XpEntry[]> {
    constructor() {
        super(state => state.character?.xpEntries, updateXpEntries);
    }

    get planningEntries() {
        if (!this.model) return [];
        return this.model.filter(x => x.planningMode);
    }

    get pastEntries() {
        if (!this.model) return [];
        return this.model.filter(x => !x.planningMode);
    }

    deletePreviousEntries = () => {
        let currentYear = this.state.present.character.ageing.currentYear;
        this.model = this.model.filter(m => m.year >= currentYear);
    }
}