import { nextStateHistory, StateHistory } from "@aurelia/store-v1";
import { Ability, ArsCharacter, ArsCharacterDescription as CharacterDescription, Arts, Characteristics, Flaw, PhysicalStatus, State, Virtue } from "../types";
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
            parens: '',
            physicalDescription: ''
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
        virtues: [],
        arts: {
            creo: { level: 0, xp: 0, puissant: false },
            muto: { level: 0, xp: 0, puissant: false },
            rego: { level: 0, xp: 0, puissant: false },
            intellego: { level: 0, xp: 0, puissant: false },
            perdo: { level: 0, xp: 0, puissant: false },
            animal: { level: 0, xp: 0, puissant: false },
            auram: { level: 0, xp: 0, puissant: false },
            aquam: { level: 0, xp: 0, puissant: false },
            ignem: { level: 0, xp: 0, puissant: false },
            terram: { level: 0, xp: 0, puissant: false },
            herbam: { level: 0, xp: 0, puissant: false },
            mentem: { level: 0, xp: 0, puissant: false },
            corpus: { level: 0, xp: 0, puissant: false },
            imaginem: { level: 0, xp: 0, puissant: false },
            vim: { level: 0, xp: 0, puissant: false }
        }
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

export function updateName(state: StateHistory<State>, name: string) {
    console.log("Saving name", name);
    const newState = deepCopy(state.present);
    newState.character.description.name = name;
    return nextStateHistory(state, newState);
}

export function updateAbilities(state: StateHistory<State>, abilities: Ability[]) {
    console.log("Saving abilities", abilities);
    const newState = deepCopy(state.present);
    newState.character.abilities = abilities.filter(x => x.name != '').sort((a, b) => a.name.localeCompare(b.name));
    return nextStateHistory(state, newState);
}

export function updateVirtues(state: StateHistory<State>, virtues: Virtue[]) {
    console.log("Saving virtues", virtues);
    const newState = deepCopy(state.present);
    newState.character.virtues = virtues.filter(x => x.name != '').sort((a, b) => a.name.localeCompare(b.name));
    return nextStateHistory(state, newState);
}

export function updateFlaws(state: StateHistory<State>, flaws: Flaw[]) {
    console.log("Saving flaws", flaws);
    const newState = deepCopy(state.present);
    newState.character.flaws = flaws.filter(x => x.name != '').sort((a, b) => a.name.localeCompare(b.name));
    return nextStateHistory(state, newState);
}

export function updateDescription(state: StateHistory<State>, description: CharacterDescription) {
    console.log("Saving description", description);
    const newState = deepCopy(state.present);
    newState.character.description = description;
    return nextStateHistory(state, newState);
}

export function updatePhysicalStatus(state: StateHistory<State>, physicalStatus: PhysicalStatus) {
    console.log("Saving physical status", physicalStatus);
    const newState = deepCopy(state.present);
    newState.character.physicalStatus = physicalStatus;
    return nextStateHistory(state, newState);
}

export function updateArts(state: StateHistory<State>, arts: Arts) {
    console.log("Saving arts", arts);
    const newState = deepCopy(state.present);
    newState.character.arts = arts;
    return nextStateHistory(state, newState);
}