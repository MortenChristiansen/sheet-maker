import { bindable } from "aurelia";

export class List {
    @bindable title: string;
    @bindable items: { name: string, additionalInfo: string }[] = [];
    @bindable hasAdditionalInfo: boolean = false;

    itemAdded = (name: string) => {
        this.items.push({ name, additionalInfo: '' });
        this.items.sort((a, b) => a.name.localeCompare(b.name));
    }
} 