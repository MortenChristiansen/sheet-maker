import { updateConfidence } from "../actions/sheetActions";
import { Confidence } from "../types";
import { Widget } from "./widget";

export class ConfidenceBlock extends Widget<Confidence> {
    constructor() {
        super(state => state.character?.confidence, updateConfidence);
    }
}