import { connectTo, StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { container } from "../main";
import { State } from "../types";
import { debounce, deepCopy } from "../utils";

@connectTo()
export class WidgetBase {
    state: StateHistory<State>;
    store: Store<StateHistory<State>>;
    ea: IEventAggregator;
    active: boolean = false;
    interacting: boolean = false;

    constructor() {
        this.store = container.get(Store<StateHistory<State>>);
        this.ea = container.get(IEventAggregator);
    }

    get typename() {
        return "BASE";
    }

    stopInteraction = debounce(() => {
        this.interacting = false;
    }, 1000);

    bound() {
        this.active = true;
        this.checkForChanges();

        this.ea.subscribe('ui-interaction', () => {
            this.interacting = true;
            this.stopInteraction();
        });
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
    }

    hasChanges() {
        return false;
    }
}

export class Widget<TModel> extends WidgetBase {
    model: TModel = undefined;
    modelState: TModel = undefined;
    
    // TODO: Save if you leave or refresh the page (it does not work to just call saveChanges in the unbound method)

    constructor(
        private pluckModel: (state: State) => TModel,
        private saveAction: (state: StateHistory<State>, model: TModel) => StateHistory<State>) {
            super();
        
    }

    stateChanged(newState: StateHistory<State>, oldState: StateHistory<State>) {
        if (newState.present) {
            let modelStateCandidate = this.pluckModel(newState.present);
            let hasChanges = JSON.stringify(this.modelState) !== JSON.stringify(modelStateCandidate);
            if (!hasChanges) return;

            this.modelState = this.pluckModel(newState.present);
            if (this.modelState === undefined) {
                return;
            }
            this.modelState = this.transformModel(this.modelState);

            if (this.model === undefined) {
                this.model = deepCopy(this.pluckModel(newState.present));
            }

            // This check prevents us from losing focus when manipulating the widget since we do not rebind the UI when we do not need to
            if (this.hasChanges()) {
                this.model = deepCopy(this.modelState);
            }
        }
    }

    transformModel(model: TModel) {
        return model;
    }

    saveChanges() {
        if (this.interacting) return;
        this.store.dispatch(this.saveAction, deepCopy(this.model));
    }

    hasChanges() {
        return JSON.stringify(this.modelState) !== JSON.stringify(this.model);
    }
}

export class SubWidget<TModel, TSubModel> extends WidgetBase {
    model: TModel = undefined;
    modelState: TSubModel = undefined;

    constructor(
        private pluckModel: (state: State) => TModel,
        private pluckSubModel: (model: TModel) => TSubModel,
        private updateSubModel: (model:TModel, subModel: TSubModel) => void,
        private saveAction: (state: StateHistory<State>, model: TSubModel) => StateHistory<State>) {
            super();
    }

    stateChanged(newState: StateHistory<State>, oldState: StateHistory<State>) {
        if (newState.present) {
            let modelStateCandidate = this.pluckSubModel(this.pluckModel(newState.present));
            let hasChanges = JSON.stringify(this.modelState) !== JSON.stringify(modelStateCandidate);
            if (!hasChanges) return;

            this.modelState = this.pluckSubModel(this.pluckModel(newState.present));
            if (this.modelState === undefined) {
                return;
            }

            if (this.model === undefined) {
                this.model = deepCopy(this.pluckModel(newState.present));
            } 

            // This check prevents us from losing focus when manipulating the widget since we do not rebind the UI when we do not need to
            if (this.hasChanges()) {
                this.updateSubModel(this.model, deepCopy(this.modelState));
            }
        }
    }

    saveChanges() {
        if (this.interacting) return;
        this.store.dispatch(this.saveAction, deepCopy(this.pluckSubModel(this.model)));
    }

    hasChanges() {
        if (this.model === undefined) return false;
        return JSON.stringify(this.modelState) !== JSON.stringify(this.pluckSubModel(this.model));
    }
}