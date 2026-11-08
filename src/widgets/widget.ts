import { connectTo, StateHistory, Store } from "@aurelia/store-v1";
import { IDisposable, IEventAggregator } from "aurelia";
import { characterGeneration, saveWidgetChanges } from "../actions/sheetActions";
import { container } from "../main";
import { State } from "../types";
import { debounce, deepCopy, isEqual, mergeChanges } from "../utils";

@connectTo()
export class WidgetBase {
    state: StateHistory<State>;
    store: Store<StateHistory<State>>;
    ea: IEventAggregator;
    active: boolean = false;
    interacting: boolean = false;
    protected subscriptions: IDisposable[] = [];
    private checkTimer: ReturnType<typeof setTimeout>;

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

        this.subscriptions.push(this.ea.subscribe('ui-interaction', () => {
            this.interacting = true;
            this.stopInteraction();
        }));
    }

    // Aurelia 2 has no unbound hook. connectTo wraps this method and unsubscribes from the store before calling it.
    unbinding() {
        this.active = false;
        clearTimeout(this.checkTimer);
        this.subscriptions.forEach(s => s.dispose());
        this.subscriptions = [];

        // Save pending edits right away so they are not lost when leaving the page
        if (this.hasChanges()) {
            this.saveChanges(true);
        }
    }

    checkForChanges() {
        if (!this.active) {
            return;
        }

        if (this.hasChanges()) {
            this.saveChanges();
        }

        this.checkTimer = setTimeout(() => {
            this.checkForChanges();
        }, 2000);
    }
    
    saveChanges(force = false) {
    }

    hasChanges() {
        return false;
    }
}

export class Widget<TModel> extends WidgetBase {
    model: TModel = undefined;
    modelState: TModel = undefined;
    private lastSaved: TModel = undefined;
    private generation: number = undefined;

    constructor(
        private pluckModel: (state: State) => TModel,
        private saveAction: (state: StateHistory<State>, model: TModel) => StateHistory<State>) {
            super();
        
    }

    stateChanged(newState: StateHistory<State>, oldState: StateHistory<State>) {
        if (newState.present) {
            const pluckedModel = this.pluckModel(newState.present);
            if (pluckedModel === undefined) {
                return;
            }

            // Transform a copy. The plucked model belongs to the store and can be shared with other widgets
            // (e.g. all the lab widgets), so transforming it in place makes their model state go stale.
            const modelStateCandidate = this.transformModel(deepCopy(pluckedModel));
            const characterReplaced = this.generation !== characterGeneration.value;
            this.generation = characterGeneration.value;
            if (!characterReplaced && this.lastSaved === undefined && isEqual(this.modelState, modelStateCandidate)) return;

            // After a save, local edits are relative to what was saved rather than to the previous state
            const base = this.lastSaved ?? this.modelState;
            this.lastSaved = undefined;
            this.modelState = modelStateCandidate;

            if (this.model === undefined || characterReplaced) {
                this.model = deepCopy(this.modelState);
            } else if (this.hasChanges()) {
                // Keep unsaved edits (another widget may have saved the same slice of state) and take everything
                // else from the store. Merging in place keeps focus and keeps open dialogs pointing at the model.
                this.model = mergeChanges(base, this.model, deepCopy(this.modelState));
            }
        }
    }

    transformModel(model: TModel) {
        return model;
    }

    saveChanges(force = false) {
        if (this.interacting && !force) return;
        const base = deepCopy(this.modelState);
        const local = deepCopy(this.model);
        this.lastSaved = deepCopy(this.model);
        this.store.dispatch(saveWidgetChanges, this.saveAction,
            (present: State) => mergeChanges(base, local, this.transformModel(deepCopy(this.pluckModel(present)))),
            this.generation);
    }

    hasChanges() {
        return !isEqual(this.modelState, this.model);
    }
}

export class SubWidget<TModel, TSubModel> extends WidgetBase {
    model: TModel = undefined;
    modelState: TSubModel = undefined;
    private lastSaved: TSubModel = undefined;
    private generation: number = undefined;

    constructor(
        private pluckModel: (state: State) => TModel,
        private pluckSubModel: (model: TModel) => TSubModel,
        private updateSubModel: (model:TModel, subModel: TSubModel) => void,
        private saveAction: (state: StateHistory<State>, model: TSubModel) => StateHistory<State>) {
            super();
    }

    stateChanged(newState: StateHistory<State>, oldState: StateHistory<State>) {
        if (newState.present) {
            const pluckedSubModel = this.pluckSubModel(this.pluckModel(newState.present));
            if (pluckedSubModel === undefined) {
                return;
            }

            // Transform a copy so we never mutate the store's state (see Widget.stateChanged)
            const modelStateCandidate = this.transformModel(deepCopy(pluckedSubModel));
            const characterReplaced = this.generation !== characterGeneration.value;
            this.generation = characterGeneration.value;
            if (!characterReplaced && this.lastSaved === undefined && isEqual(this.modelState, modelStateCandidate)) return;

            const base = this.lastSaved ?? this.modelState;
            this.lastSaved = undefined;
            this.modelState = modelStateCandidate;

            if (this.model === undefined || characterReplaced) {
                this.model = deepCopy(this.pluckModel(newState.present));
                this.updateSubModel(this.model, deepCopy(this.modelState));
            } else if (this.hasChanges()) {
                this.updateSubModel(this.model, mergeChanges(base, this.pluckSubModel(this.model), deepCopy(this.modelState)));
            }
        }
    }

    saveChanges(force = false) {
        if (this.interacting && !force) return;
        const base = deepCopy(this.modelState);
        const local = deepCopy(this.pluckSubModel(this.model));
        this.lastSaved = deepCopy(this.pluckSubModel(this.model));
        this.store.dispatch(saveWidgetChanges, this.saveAction,
            (present: State) => mergeChanges(base, local, this.transformModel(deepCopy(this.pluckSubModel(this.pluckModel(present))))),
            this.generation);
    }

    hasChanges() {
        if (this.model === undefined) return false;
        return !isEqual(this.modelState, this.pluckSubModel(this.model));
    }

    transformModel(model: TSubModel) {
        return model;
    }
}
