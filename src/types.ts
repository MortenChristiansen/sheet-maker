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
    spellWishlist: Spell[];
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
    belongings: Belongings;
    talisman: Talisman;
    magicItems: MagicItem[];
    quests: Quest[];
    npcs: Npc[];
}

export interface Virtue {
    name: string;
    additionalInfo: string;
}

export interface Flaw {
    name: string;
    additionalInfo: string;
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
    totalPenaly: number;
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
    additionalInfo: string;
    sigil: string;
    range: string;
    duration: string;
    target: string;
    attunementBonus: number;
    attunement: string;
    castingTotal: number;
    onWishlist: boolean;
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
    additionalInfo: string;
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
    inventiveGeniusVirtue: boolean;
    cyclicMagicVirtue: boolean,
    cyclicMagicFlaw: boolean,
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
    newWork: boolean;
    experiment: boolean;
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
    level: number;
    nocturnal: boolean;
    positiveCycle: boolean;
    additionalInfo: string;
}

export interface SpellcastingStats {
    staminaSpecialisation: boolean;
    aura: number;
    cyclicMagicVirtue: boolean;
    cyclicMagicFlaw: boolean;
    positiveCycle: boolean;
    loudVoice: boolean;
    largeGestures: boolean;
    ceremonial: boolean;
    arts: string;
    talismanBonus: number;
    similarFomulaicSpellBonus: number;
    focus: boolean;
    spontaneousCastingTotal: number;
}

export interface Belongings {
    carried: string;
    inSanctum: string;
    vis: Vis[];
}

export interface Vis {
    name: string;
    amountInLab: number;
    amountOnPerson: number;
    income: string;
    notes: string;
}

export interface Talisman {
    investedVis: number;
    spentVis: number;
    description: string;
    bonuses: TalismanBonus[];
    effects: MagicItemEffect[];
}

export interface TalismanBonus {
    name: string;
    source: string;
    bonus: number;
    instilled: boolean;
    notes: string;
}

export interface MagicItem {
    name: string;
    investedVis: number;
    spentVis: number;
    description: string;
    effects: MagicItemEffect[];
}

export interface MagicItemEffect {
    name: string;
    arts: string;
    level: number;
    usages: string;
    range: string;
    duration: string;
    target: string;
    penetration: number;
    description: string;
}

export interface Quest {
    name: string;
    priority: number;
    focused: boolean;
    additionalInfo: string;
}

export interface Npc {
    name: string;
    description: string;
    additionalInfo: string;
}

export interface State {
    character?: ArsCharacter;
}

export const initialState: State = {
    character: {
        type: 'magus',
        physicalStatus : {
            fatigue : 0,
            lightWounds: 0,
            mediumWounds: 0,
            heavyWounds: 0,
            totalPenaly: 0
        },
        description: {
            name: '',
            description: ''
        },
        abilities: [],
        personalityTraits: [],
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
        },
        spells: [],
        spellWishlist: [],
        ageing: {
            age: 25,
            apparentAge: 25,
            birthYear: 1195,
            currentYear: 1220,
            decrepitudeLevel: 0,
            decrepitudePoints: 0,
            longevityModifier: 0,
            ageingRollModifier: 0,
            livingConditionModifier: 0
        },
        confidence: {
            score: 3
        },
        warping: {
            warpingPoints: 0,
            warpingLevel: 0,
            ongoingEffects: []
        },
        activeMagic: [],
        xpEntries: [],
        notes: '',
        background: '',
        lab: {
            art1: { name: '', rating: 0 },
            art2: { name: '', rating: 0 },
            art3: { name: '', rating: 0 },
            art4: { name: '', rating: 0 },
            specialisation1: { name: '', rating: 0 },
            specialisation2: { name: '', rating: 0 },
            auraBonus: 0,
            description: '',
            effectiveSafety: 0,
            flaws: [],
            virtues: [],
            intelligenceBonus: 0,
            labBaseQuality: 0,
            livingConditionsModifier: 0,
            magicTheory: 0,
            occupiedSize: 0,
            refinement: 0,
            size: 0,
            availableModifiers: [{ name: 'GQ'}, { name: 'Safety'}, { name: 'Health'}, { name: 'Aesthetics'}, { name: 'Upkeep'}, { name: 'Warping'}],
            researchProjects: [],
            inventiveGeniusVirtue: false,
            cyclicMagicVirtue: false,
            cyclicMagicFlaw: false
        },
        spellcastingStats: {
            arts: '',
            aura: 0,
            ceremonial: false,
            cyclicMagicVirtue: false,
            cyclicMagicFlaw: false,
            positiveCycle: false,
            focus: false,
            largeGestures: false,
            loudVoice: false,
            similarFomulaicSpellBonus: 0,
            spontaneousCastingTotal: 0,
            staminaSpecialisation: false,
            talismanBonus: 0
        },
        sigil: '',
        belongings: {
            carried: '',
            inSanctum: '',
            vis: []
        },
        talisman: {
            description: '',
            investedVis: 0,
            spentVis: 0,
            bonuses: [],
            effects: []
        },
        magicItems: [],
        quests: [],
        npcs: []
    }
};