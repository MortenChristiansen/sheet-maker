import { bindable, IEventAggregator } from "aurelia";

export class TextBox {
    @bindable title: string;
    @bindable text: string;

    constructor(@IEventAggregator readonly ea: IEventAggregator) {
    }

    onChange = () => {
        this.ea.publish('ui-interaction');
    }
}