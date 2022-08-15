import { updateSigil } from "../actions/sheetActions";
import { Widget } from "./widget";

export class Sigil extends Widget<string> {
    constructor() {
        super(state => state.character?.sigil, updateSigil);
    }

    dragging: boolean = false;

    onDrop = (event: DragEvent) => {
        if (event.dataTransfer.items.length != 1) {
            return;
        }
        let item = event.dataTransfer.items[0];
        if(item.kind != 'file' || !item.type.startsWith('image')) {
            return;
        }

        var reader = new FileReader();
        reader.onload = () => {
            this.model = reader.result as string;
            this.dragging = false;
        }
        reader.readAsDataURL(item.getAsFile());
    }
}