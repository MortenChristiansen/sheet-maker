import { connectTo, StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { State } from "../types";
import { debounce, deepCopy } from "../utils";

const debug: boolean = false;

@connectTo()
export class Widget<TModel> {
    model: TModel = undefined;
    modelState: TModel = undefined;
    active: boolean = false;
    state: StateHistory<State>;

    // TODO: Save if you leave or refresh the page (it does not work to just call saveChanges in the unbound method)

    constructor(
        private store: Store<StateHistory<State>>,
        private pluckModel: (state: State) => TModel,
        private saveAction: (state: StateHistory<State>, model: TModel) => StateHistory<State>,
        public readonly ea: IEventAggregator) {
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

    interacting: boolean = false;
    bound() {
        this.active = true;
        this.checkForChanges();

        this.ea.subscribe('ui-interaction', () => {
            this.interacting = true;
            this.stopInteraction();
        });
    }

    stopInteraction = debounce(() => {
        this.interacting = false;
    }, 1000);

    unbound() {
        this.active = false;
    }

    checkForChanges() {
        if (!this.active) {
            return;
        }

        if (this.hasChanges()) {
            if (debug) {
                console.log("SAVING", JSON.stringify(this.modelState), JSON.stringify(this.model))
            }
            this.saveChanges();
        }

        setTimeout(() => {
            this.checkForChanges();
        }, 2000);
    }

    saveChanges() {
        if (this.interacting) return;
        this.store.dispatch(this.saveAction, deepCopy(this.model));
    }

    hasChanges() {
        return JSON.stringify(this.modelState) !== JSON.stringify(this.model);
    }
}