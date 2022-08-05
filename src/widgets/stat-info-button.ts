import { StateHistory, Store } from "@aurelia/store-v1";
import { bindable, IEventAggregator } from "aurelia";
import { updateStatInformation } from "../actions/sheetActions";
import { TextDialog } from "../components/text-dialog";
import { Information, State } from "../types";
import { Widget } from "./widget";

export class StatInfoButton extends Widget<Information[]> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.statInformation, updateStatInformation, ea);
    }

    @bindable stat: string;

    get isActive() {
        if (!this.model) this.model = [];
        return this.model.findIndex(m => m.target == this.stat) >= 0;
    }

    activate = () => {
        if (!this.model) this.model = [];
        let statInformation = this.model.find(m => m.target == this.stat);
        let model = { value: statInformation?.value ?? '', title: 'INFORMATION' };

        TextDialog.open(model, () => {
            if (!statInformation) {
                this.model.push({
                    target: this.stat,
                    value: model.value
                });
            } else {
                statInformation.value = model.value;
            }
        });
    }
}