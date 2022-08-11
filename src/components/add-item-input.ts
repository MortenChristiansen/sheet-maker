import { bindable, containerless } from "aurelia";

@containerless
export class AddItemInput {
    @bindable placeholder: string = '';
    @bindable onItemAdded: (itemName: string, parent?: any) => void;
    @bindable parent: any;
    @bindable class: string = '';

    newItemString: string = '';

    keyPressed = (event: KeyboardEvent) => {
        if (this.onItemAdded && event.key == "Enter" && this.newItemString) {
            if (this.parent) {
                this.onItemAdded(this.newItemString, this.parent);
            } else {
                this.onItemAdded(this.newItemString);
            }
            this.newItemString = '';
        }
    }
}