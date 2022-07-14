import { connectTo, StateHistory, Store } from "@aurelia/store-v1";
import { State } from "../types";
import { deepCopy } from "../utils";

@connectTo()
export class Widget<TModel> {
    model: TModel = undefined;
    modelState: TModel = undefined;
    active: boolean = false;

    constructor(
        private store: Store<StateHistory<State>>,
        private pluckModel: (state: State) => TModel,
        private saveAction: (state: StateHistory<State>, model: TModel) => StateHistory<State>) {
    }

    stateChanged(newState: StateHistory<State>, oldState: StateHistory<State>) {
        if (newState.present) {
            this.modelState = this.pluckModel(newState.present);
            // This check prevents us from losing focus when manipulating the widget since we do not rebind the UI when we do not need to
            if (this.hasChanges()) {
                this.model = deepCopy(this.modelState);
            }
        }
    }

    bound() {
        this.active = true;
        this.checkForChanges();
    }

    unbound() {
        this.active = false;
    }

    checkForChanges() {
        if (!this.active) {
            return;
        }

        if (this.hasChanges()) {
            this.saveChanges();
        }

        setTimeout(() => {
            this.checkForChanges();
        }, 2000);
    }

    saveChanges() {
        this.store.dispatch(this.saveAction, deepCopy(this.model));
    }

    hasChanges() {
        return JSON.stringify(this.modelState) !== JSON.stringify(this.model);
    }
}