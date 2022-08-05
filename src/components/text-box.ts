import { bindable, IEventAggregator } from "aurelia";

export class TextBox {
    @bindable title: string;
    @bindable text: string;
    @bindable showBorders: boolean = true;

    constructor(@IEventAggregator readonly ea: IEventAggregator) {
    }

    onChange = () => {
        this.ea.publish('ui-interaction');
    }
}