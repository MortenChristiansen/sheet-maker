interface Ability {
    name: string;
    specialisation: string;
    level: number;
    xp: number;
    puissant: boolean;
}

export class AbilitiesBlock {
    newItemText: string = '';
    items: Ability[] = [];

    keyPressed = (event: KeyboardEvent) => {
        if (event.key == "Enter" && this.newItemText) {
            this.items.push({ name: this.newItemText, specialisation: '', level: 0, xp: 0, puissant: false });
            this.newItemText = '';
        }
    }
}