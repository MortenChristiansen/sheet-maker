import { bindable } from "aurelia";

export class DroppableImage {
    @bindable value: string;

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
            this.value = reader.result as string;
            this.dragging = false;
        }
        reader.readAsDataURL(item.getAsFile());
    }
}