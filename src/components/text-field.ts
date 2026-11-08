import { bindable, containerless, IEventAggregator, resolve } from "aurelia";

@containerless
export class TextField {
    @bindable value: string;
    @bindable placeholder: string = '';
    @bindable title: string = '';
    @bindable class: string = '';

    readonly ea = resolve(IEventAggregator);

    constructor() {
    }

    onChange = () => {
        this.ea.publish('ui-interaction');
    }
}