import { watch } from "@aurelia/runtime-html";
import { connectTo, StateHistory, Store } from "@aurelia/store-v1";
import { updateCharacteristics } from "../actions/sheetActions";
import { Characteristics, State } from "../types";
import { debounce, deepCopy } from "../utils";

@connectTo()
// TODO: Can we watch all the things somehow and perhaps drop the verbose model initialisation as well?
@watch('model.strength.value', 'modelChanged')
@watch('model.strength.agingPoints', 'modelChanged')
@watch('model.strength.specialisation', 'modelChanged')
@watch('model.dexterity.value', 'modelChanged')
@watch('model.dexterity.agingPoints', 'modelChanged')
@watch('model.dexterity.specialisation', 'modelChanged')
@watch('model.stamina.value', 'modelChanged')
@watch('model.stamina.agingPoints', 'modelChanged')
@watch('model.stamina.specialisation', 'modelChanged')
@watch('model.quickness.value', 'modelChanged')
@watch('model.quickness.agingPoints', 'modelChanged')
@watch('model.quickness.specialisation', 'modelChanged')
@watch('model.intelligence.value', 'modelChanged')
@watch('model.intelligence.agingPoints', 'modelChanged')
@watch('model.intelligence.specialisation', 'modelChanged')
@watch('model.presence.value', 'modelChanged')
@watch('model.presence.agingPoints', 'modelChanged')
@watch('model.presence.specialisation', 'modelChanged')
@watch('model.perception.value', 'modelChanged')
@watch('model.perception.agingPoints', 'modelChanged')
@watch('model.perception.specialisation', 'modelChanged')
@watch('model.communication.value', 'modelChanged')
@watch('model.communication.agingPoints', 'modelChanged')
@watch('model.communication.specialisation', 'modelChanged')
export class CharacteristicsBlock {
    model: Characteristics = {
        strength: { value: undefined, specialisation: undefined, agingPoints: undefined },
        dexterity: { value: undefined, specialisation: undefined, agingPoints: undefined },
        stamina: { value: undefined, specialisation: undefined, agingPoints: undefined },
        quickness: { value: undefined, specialisation: undefined, agingPoints: undefined },
        intelligence: { value: undefined, specialisation: undefined, agingPoints: undefined },
        presence: { value: undefined, specialisation: undefined, agingPoints: undefined },
        perception: { value: undefined, specialisation: undefined, agingPoints: undefined },
        communication: { value: undefined, specialisation: undefined, agingPoints: undefined }
    };

    constructor(private store: Store<StateHistory<State>>) {}

    stateChanged(newState: StateHistory<State>, oldState: StateHistory<State>) {
        if (newState.present.character) {
            this.model = deepCopy(newState.present.character.characteristics);
        }
    }

    public modelChanged(newValue, oldValue) {
        if (newValue != oldValue && oldValue !== undefined) {
            this.saveChanges();
        }
    }

    saveChanges = debounce(() => this.store.dispatch(updateCharacteristics, deepCopy(this.model)), 2000);
}