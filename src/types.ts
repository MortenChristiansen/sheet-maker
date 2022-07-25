export type ColorMode = "color" | "monochrome";

export interface ArsCharacter {
    type: "magus" | "companion";
    description: CharacterDescription;
    characteristics: Characteristics;
    personalityTraits: PersonalityTrait[];
    virtues: Virtue[];
    flaws: Flaw[];
    physicalStatus: PhysicalStatus;
    abilities: Ability[];
    arts: Arts;
    spells: Spell[];
    ageing: Ageing;
    confidence: Confidence;
    warping: Warping;
    activeMagic: ActiveMagic[];
    xpEntries: XpEntry[];
    notes: string;
    background: string;
    lab: Lab;
    spellcastingStats: SpellcastingStats;
    sigil: string;
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

export class Ageing {
    birthYear: number;
    currentYear: number;
    age: number;
    apparentAge: number;
    decrepitudePoints: number;
    decrepitudeLevel: number;
    longevityModifier: number;
    ageingRollModifier: number;
    livingConditionModifier: number;
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

export interface PersonalityTrait {
    name: string;
    rating: number;
}

export interface Ability {
    name: string;
    specialisation: string;
    level: number;
    xp: number;
    puissant: boolean;
}

export interface Confidence {
    score: number;
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
    ritual: boolean;
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

export interface Warping {
    warpingPoints: number;
    warpingLevel: number;
    ongoingEffects: WarpingEffect[];
}

export interface WarpingEffect {
    name: string;
    warpingPointsPerYear: number;
}

export interface ActiveMagic {
    name: string;
    penetration: number;
    active: boolean;
}

export interface XpEntry {
    description: string;
    xp: string;
    year: number;
    season: 'Spring' | 'Summer' | 'Fall' | 'Winter';
    correspondence: string;
    areaLore: string;
    plans: string;
    planningMode: boolean;
}

export interface Lab {
    description: string;
    virtues: LabModification[];
    flaws: LabModification[];
    size: number;
    occupiedSize: number;
    refinement: number;
    effectiveSafety: number;
    livingConditionsModifier;
    specialisation1: LabModifier;
    specialisation2: LabModifier;
    art1: LabModifier;
    art2: LabModifier;
    art3: LabModifier;
    art4: LabModifier;
    intelligenceBonus: number;
    auraBonus: number;
    magicTheory: number;
    labBaseQuality: number;
    availableModifiers: LabModifierType[];
    researchProjects: ResearchProject[];
}

export interface LabModifierType {
    name: string;
}

export interface LabModifier {
    name: string;
    rating: number;
}

export interface LabModification {
    name: string;
    category: 'Structure' | 'Outfitting' | 'Supernatural';
    type: 'Virtue' | 'Flaw';
    cost: number;
    modifiers: LabModifier[];
    notes: string;
}

export interface ResearchProject {
    name: string;
    arts: string;
    prerequisites: string;
    artModifier: number;
    focus: boolean;
    specialisationBonus: number;
    magicTheorySpecialisation: boolean;
    intelligenceSpecialisation: boolean;
    talisman: boolean;
    similarResearchBonus: number;
    material: string;
    materialBonus: number;
    shape: string;
    shapeBonus: number;
    labAssistantBonus: number;
    labTotal: number;
    accumulatedLabTotal: number;
    surplusLabTotal: number;
    description: string;
    level: number;
}

export interface SpellcastingStats {
    staminaSpecialisation: boolean;
    aura: number;
    cyclicMagicVirtue: boolean;
    loudVoice: boolean;
    largeGestures: boolean;
    ceremonial: boolean;
    arts: string;
    talismanBonus: number;
    similarFomulaicSpellBonus: number;
    focus: boolean;
    spontaneousCastingTotal: number;
}

export interface State {
    character?: ArsCharacter;
}

export const initialState: State = {
    character: null
};