import { updateBackground } from "../actions/sheetActions";
import { Widget } from "./widget";

export class BackgroundBlock extends Widget<string> {
    constructor() {
        super(state => state.character?.background, updateBackground);
    }
}