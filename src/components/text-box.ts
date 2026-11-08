import { bindable, IEventAggregator, resolve } from "aurelia";

export class TextBox {
    @bindable title: string;
    @bindable text: string;
    @bindable showBorders: boolean = true;

    readonly ea = resolve(IEventAggregator);

    constructor() {
    }

    onChange = () => {
        this.ea.publish('ui-interaction');
    }
}