import { watch } from "@aurelia/runtime-html";
import { connectTo, StateHistory, Store } from "@aurelia/store-v1";
import { updateName } from "../actions/sheetActions";
import { State } from "../types";
import { debounce } from "../utils";

@connectTo()
@watch('name', 'nameChanged')
export class PageHeader {
    name: string = 'undefined';

    constructor(private store: Store<StateHistory<State>>) {}

    // TODO: Move the textbox out into a widget instead of having custom save logic (the UI can remain here)

    stateChanged(newState: StateHistory<State>, oldState: StateHistory<State>) {
        if (newState.present.character) {
            this.name = newState.present.character.description.name;
        }
    }

    public nameChanged(newName, oldName) {
        if (oldName != newName && oldName !== 'undefined') {
            this.saveChanges();
        }
    }

    saveChanges = debounce(() => this.store.dispatch(updateName, this.name), 2000);
}