import { bindable, containerless } from "aurelia";

@containerless
export class AddItemInput {
    @bindable placeholder: string;
    @bindable onItemAdded: (itemName: string) => void;

    newItemString: string = '';

    keyPressed = (event: KeyboardEvent) => {
        if (this.onItemAdded && event.key == "Enter" && this.newItemString) {
            this.onItemAdded(this.newItemString);
            this.newItemString = '';
        }
    }
}