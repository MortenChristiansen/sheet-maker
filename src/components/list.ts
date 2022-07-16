import { bindable } from "aurelia";

export class List {
    @bindable title: string;
    @bindable items: { name: string }[] = [];

    newItemText: string = '';

    keyPressed = (event: KeyboardEvent) => {
        if (event.key == "Enter" && this.newItemText) {
            this.items.push({ name: this.newItemText });
             this.items.sort((a, b) => a.name.localeCompare(b.name));
             this.newItemText = '';
        }
    }
} 