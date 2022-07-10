import { nextStateHistory, StateHistory } from "@aurelia/store-v1";
import { ArsCharacter, Characteristics, State } from "../types";
import { deepCopy } from "../utils";

export function createNewCharacter(state: StateHistory<State>) {
    const newState = deepCopy(state.present);
    newState.character = {
        physicalStatus : {
            fatigue : 0,
            incapacitated: false,
            minorWounds: 0,
            mediumWounds: 0,
            heavyWounds: 0
        },
        description: {
            name: '',
            house: '',
            parens: ''
        },
        abilities: [],
        characteristics: {
            communication: { value: 0, specialisation: '', agingPoints: 0 },
            dexterity: { value: 0, specialisation: '', agingPoints: 0 },
            intelligence: { value: 0, specialisation: '', agingPoints: 0 },
            perception: { value: 0, specialisation: '', agingPoints: 0 },
            presence: { value: 0, specialisation: '', agingPoints: 0 },
            quickness: { value: 0, specialisation: '', agingPoints: 0 },
            stamina: { value: 0, specialisation: '', agingPoints: 0 },
            strength: { value: 0, specialisation: '', agingPoints: 0 }
        },
        flaws: [],
        virtues: []
    };
    return nextStateHistory(state, newState);
}

export function loadCharacter(state: StateHistory<State>, character: ArsCharacter) {
    const newState = deepCopy(state.present);
    newState.character = character;
    return nextStateHistory(state, newState);
}

export function updateCharacteristics(state: StateHistory<State>, characteristics: Characteristics) {
    console.log("Saving characteristics", characteristics);
    const newState = deepCopy(state.present);
    newState.character.characteristics = characteristics;
    return nextStateHistory(state, newState);
}