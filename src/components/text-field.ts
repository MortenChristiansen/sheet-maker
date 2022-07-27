import { bindable, containerless, IEventAggregator } from "aurelia";

@containerless
export class TextField {
    @bindable value: string;
    @bindable placeholder: string = '';
    @bindable title: string = '';
    @bindable class: string = '';

    constructor(@IEventAggregator readonly ea: IEventAggregator) {
    }

    onChange = () => {
        this.ea.publish('ui-interaction');
    }
}