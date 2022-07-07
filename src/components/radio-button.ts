import { bindable, IEventAggregator } from "aurelia";
import { Component } from "./component";

export class RadioButton extends Component {
    @bindable state: "selected"|"unselected" = "unselected";
    @bindable group: string;

    element: Element;

    constructor(@IEventAggregator readonly ea: IEventAggregator) {
        super();
    }

    bound() {
        this.ea.subscribe<{ group: string, source: Element }, 'radio-button-selected'>('radio-button-selected', payload => {
            if (this.group == payload.group) {
                this.state = payload.source === this.element ? "selected": "unselected";
            }
        });
    }

    select = () => {
        if (!this.group) {
            this.state = "selected";
        } else {
            this.ea.publish('radio-button-selected', { group: this.group, source: this.element } )
        }
    }
}