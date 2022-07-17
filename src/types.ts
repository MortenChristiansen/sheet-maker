export type ColorMode = "color" | "monochrome";

export interface ArsCharacter {
    description: CharacterDescription;
    characteristics: Characteristics;
    virtues: Virtue[];
    flaws: Flaw[];
    physicalStatus: PhysicalStatus;
    abilities: Ability[];
    arts: Arts;
    spells: Spell[];
}

export interface Virtue {
    name: string;
}

export interface Flaw {
    name: string;
}

export interface CharacterDescription {
    name: string;
    description: string;
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
    lightWounds: number;
    mediumWounds: number;
    heavyWounds: number;
}

export interface Ability {
    name: string;
    specialisation: string;
    level: number;
    xp: number;
    puissant: boolean;
}

export interface Arts {
    intellego: Art;
    creo: Art;
    muto: Art;
    perdo: Art;
    rego: Art;

    animal: Art;
    aquam: Art;
    auram: Art;
    ignem: Art;
    terram: Art;
    imaginem: Art;
    herbam: Art;
    corpus: Art;
    vim: Art;
    mentem: Art;
}

export interface Spell {
    name: string;
    arts: string;
    prerequisites: string;
    xp: number;
    level: number;
    masteryLevel: number;
    masteries: string;
    pageNumber: string;
    sourceBook: string;
    focus: boolean;
    notes: string;
    sigil: string;
    range: string;
    duration: string;
    target: string;
    attunementBonus: number;
    attunement: string;
    castingTotal: number;
}

export interface Art {
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