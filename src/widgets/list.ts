import { bindable } from "aurelia";

export class List {
    @bindable title: string;

    newItemText: string = '';
    items: string[] = [];

    keyPressed = (event: KeyboardEvent) => {
        if (event.key == "Enter" && this.newItemText) {
            this.items.push(this.newItemText);
            this.newItemText = '';
        }
    }
} 