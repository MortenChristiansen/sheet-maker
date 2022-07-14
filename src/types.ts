export type ColorMode = "color" | "monochrome";

export interface ArsCharacter {
    description: ArsCharacterDescription;
    characteristics: Characteristics;
    virtues: Virtue[];
    flaws: Flaw[];
    physicalStatus: PhysicalStatus;
    abilities: Ability[];
}

export interface Virtue {
    name: string;
}

export interface Flaw {
    name: string;
}

export interface ArsCharacterDescription {
    name: string;
    house: string;
    parens: string;
}

export interface Characteristics {
    strength: Characteristic;
    dexterity: Characteristic;
    stamina: Characteristic;
    quickness: Characteristic;
    intelligence: Characteristic;
    presence: Characteristic;
    perception: Characteristic;
    communication: Characteristic;
}

export interface Characteristic {
    specialisation: string;
    value: number;
    agingPoints: number;
}

export interface PhysicalStatus {
    fatigue: number;
    minorWounds: number;
    mediumWounds: number;
    heavyWounds: number;
    incapacitated: boolean;
}

export interface Ability {
    name: string;
    specialisation: string;
    level: number;
    xp: number;
    puissant: boolean;
}

export interface State {
    character?: ArsCharacter;
}

export const initialState: State = {
    character: null
};