import { updateNotes } from "../actions/sheetActions";
import { Widget } from "./widget";

export class NotesBlock extends Widget<string> {
    constructor() {
        super(state => state.character?.notes, updateNotes);
    }
}