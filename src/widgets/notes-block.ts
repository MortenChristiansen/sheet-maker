import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateNotes } from "../actions/sheetActions";
import { State } from "../types";
import { Widget } from "./widget";

export class NotesBlock extends Widget<string> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.notes, updateNotes, ea);
    }
}