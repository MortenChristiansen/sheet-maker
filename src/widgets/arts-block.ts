import { updateArts } from "../actions/sheetActions";
import { Arts } from "../types";
import { Widget } from "./widget";

export class ArtsBlock extends Widget<Arts> {
    constructor() {
        super(s => s.character?.arts, updateArts);
    }
}