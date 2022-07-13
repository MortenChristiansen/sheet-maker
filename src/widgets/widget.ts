import { connectTo, Reducer, StateHistory, Store } from "@aurelia/store-v1";
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
            this.model = deepCopy(this.modelState);
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

        let hasChanges = JSON.stringify(this.modelState) !== JSON.stringify(this.model);
        if (hasChanges) {
            // @ts-ignore I could not get the TModel type to match, so I force the issue
            this.store.dispatch(this.saveAction, deepCopy(this.model));
        }

        setTimeout(() => {
            this.checkForChanges();
        }, 2000);
    }
}