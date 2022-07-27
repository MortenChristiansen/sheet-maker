import { bindable, IEventAggregator } from "aurelia";
import { Component } from "../components/component";

export class PrimaryStat extends Component {
    @bindable value: number;
    @bindable max: number = 99;
    @bindable min: number = -99;
    @bindable mode: "primary" | "primary-angled" | "secondary" | "secondary-angled" = "primary-angled";
    @bindable size: "xs" | "s" | "m" | "l" = "m";
    @bindable prefixPlus: boolean = false;
    @bindable readonly: boolean = false;

    containerElement: Element;
    active: boolean = false;
    delta: number = 0;
    originalValue: number;

    /* TODO
    - Bug: The dragging logic does not work with a pen.
    - Bug: The dragging logic does not work correctly when scrolling.
    - Bug: The pointer does not show the "dragging" cursor as expected.
    - Bug: The container is not big enough to hold values such as "-20". Maybe we ignore this, as this is not a value we expect.
    - Todo: Test dragging logic on touch device (phone).
    - Todo: Test that the overlay works correctly when scrolling.
    */

    constructor(@IEventAggregator readonly ea: IEventAggregator) {
        super();
    }

    press = () => {
        if (this.readonly) return;
        this.active = true;
        this.originalValue = this.value;
        this.delta = 0;

        window.addEventListener("pointerout", this.checkPointerOutsideWindow);
    }

    checkPointerOutsideWindow = (event: PointerEvent) => {
        if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight))
        {
            window.removeEventListener("pointerout", this.checkPointerOutsideWindow);
            this.release();
        }
    }

    release = () => {
        if (this.readonly) return;
        this.active = false;
    }

    move = (event: PointerEvent) => {
        if (!this.active || this.readonly) return;

        this.delta += event.movementY;

        let newValue = Math.round(this.originalValue - (this.delta / 10));
        this.value = Math.max(this.min, Math.min(this.max, newValue));
        this.ea.publish('ui-interaction');
    }

    getValuePrefix = () => {
        if (!this.prefixPlus)
            return '';

        return this.value > 0 ? '+' : '';
    }
}