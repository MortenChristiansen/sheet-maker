import { bindable } from "aurelia";
import { TextDialog } from "../components/text-dialog";

export class StatInfoButton {
    @bindable source: { [s: string]: string };
    @bindable property: string;

    get isActive() {
        let v = this.source[this.property];
        return v != undefined && v.length > 0;
    }

    activate = () => {
        let v = this.source[this.property];
        let model = { value: v ?? '', title: 'INFORMATION' };

        TextDialog.open(model, () => {
            this.source[this.property] = model.value;
        });
    }
}