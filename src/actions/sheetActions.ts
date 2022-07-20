import { nextStateHistory, StateHistory } from "@aurelia/store-v1";
import { Ability, ArsCharacter, CharacterDescription as CharacterDescription, Art, Arts, Characteristics, Flaw, PhysicalStatus, Spell, State, Virtue, PersonalityTrait, Ageing, Confidence, Warping, ActiveMagic } from "../types";
import { deepCopy } from "../utils";

export function createNewCharacter(state: StateHistory<State>) {
    const newState = deepCopy(state.present);
    newState.character = {
        physicalStatus : {
            fatigue : 0,
            lightWounds: 0,
            mediumWounds: 0,
            heavyWounds: 0
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
        activeMagic: []
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
    refreshCastingTotals(newState);
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
    newState.character.abilities = filterListItems(abilities);
    return nextStateHistory(state, newState);
}

export function updatePersonalityTraits(state: StateHistory<State>, personalityTraits: PersonalityTrait[]) {
    console.log("Saving personality traits", personalityTraits);
    const newState = deepCopy(state.present);
    newState.character.personalityTraits = filterListItems(personalityTraits);
    return nextStateHistory(state, newState);
}

export function updateVirtues(state: StateHistory<State>, virtues: Virtue[]) {
    console.log("Saving virtues", virtues);
    const newState = deepCopy(state.present);
    newState.character.virtues = filterListItems(virtues);
    refreshAgeingStats(newState);
    return nextStateHistory(state, newState);
}

export function updateFlaws(state: StateHistory<State>, flaws: Flaw[]) {
    console.log("Saving flaws", flaws);
    const newState = deepCopy(state.present);
    newState.character.flaws = filterListItems(flaws);
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
    refreshCastingTotals(newState);
    return nextStateHistory(state, newState);
}

export function updateArts(state: StateHistory<State>, arts: Arts) {
    console.log("Saving arts", arts);
    const newState = deepCopy(state.present);
    newState.character.arts = arts;
    refreshCastingTotals(newState);
    return nextStateHistory(state, newState);
}

export function updateSpells(state: StateHistory<State>, spells: Spell[]) {
    console.log("Saving spells", spells);
    const newState = deepCopy(state.present);
    newState.character.spells = filterListItems(spells).sort((a, b) => a.arts.slice(2).localeCompare(b.arts.slice(2)));
    refreshCastingTotals(newState);
    return nextStateHistory(state, newState);
}

export function updateAgeing(state: StateHistory<State>, ageing: Ageing) {
    console.log("Saving ageing", ageing);
    const newState = deepCopy(state.present);
    newState.character.ageing = ageing;
    refreshAgeingStats(newState);
    return nextStateHistory(state, newState);
}

export function updateConfidence(state: StateHistory<State>, confidence: Confidence) {
    console.log("Saving confidence", confidence);
    const newState = deepCopy(state.present);
    newState.character.confidence = confidence;
    return nextStateHistory(state, newState);
}

export function updateWarping(state: StateHistory<State>, warping: Warping) {
    console.log("Saving warping", warping);
    const newState = deepCopy(state.present);
    newState.character.warping = warping;
    newState.character.warping.ongoingEffects = filterListItems(warping.ongoingEffects);
    refreshWarpingLevel(newState);
    return nextStateHistory(state, newState);
}

export function updateActiveMagic(state: StateHistory<State>, activeMagic: ActiveMagic[]) {
    console.log("Saving active magic", activeMagic);
    const newState = deepCopy(state.present);
    newState.character.activeMagic = filterListItems(activeMagic);
    refreshPenetration(newState);
    return nextStateHistory(state, newState);
}

function filterListItems<T extends ListItem>(listItems: T[]) {
    return listItems.filter(x => x.name != '').sort((a, b) => a.name.localeCompare(b.name));
}

interface ListItem {
    name: string;
}

function refreshAgeingStats(state: State) {
    refreshAgeingRollModifier(state);
    refreshDecrepitudeLevel(state);
    refreshAge(state);
}

function refreshAgeingRollModifier(state: State) {
    let faerieBloodModifier =
        state.character.virtues.findIndex(v => v.name.indexOf("Strong Faerie Blood") >= 0) >= 0 ? 3 :
        state.character.virtues.findIndex(v => v.name.indexOf("Faerie Blood") >= 0) >= 0 ? 1 :
        0;

    state.character.ageing.ageingRollModifier =
        // TODO: Include lab safety measures
        // TODO: Include familiar bond
        state.character.ageing.livingConditionModifier +
        state.character.ageing.longevityModifier +
        faerieBloodModifier -
        Math.ceil(state.character.ageing.age / 10);
}

function refreshDecrepitudeLevel(state: State) {
    state.character.ageing.decrepitudeLevel = calculateAbilityLevel(state.character.ageing.decrepitudePoints, 0);
}

function refreshAge(state: State) {
    state.character.ageing.age = state.character.ageing.currentYear - state.character.ageing.birthYear;
}

function calculateAbilityLevel(remainingXp: number, currentLevel: number) {
    let xpToNextLevel = (currentLevel + 1) * 5;
    if (xpToNextLevel > remainingXp) return currentLevel;
    return calculateAbilityLevel(remainingXp - xpToNextLevel, currentLevel + 1);
}

function refreshCastingTotals(state: State) {
    if (!state?.character?.arts) return 0;

    state.character.spells.forEach(s => s.castingTotal = calculateCastingTotal(state, s));
}

function calculateCastingTotal(state: State, spell: Spell) {
    // TODO: Add stamina specialisation if it counts and other things such as aura, ceremonial/ritual casting
    return calculateSpellBonus(state, spell) +
           state.character.characteristics.stamina.value +
           calculateWoundPenalty(state) +
           calculateFatiguePenalty(state);
}

function calculateSpellBonus(state: State, spell: Spell) {
    // TODO: Support multiple form or technique prerequisites
    let primaryTechnique = getTechnique(state, spell.arts);
    let primaryForm = getForm(state, spell.arts);
    if (primaryTechnique === null || primaryForm == null) return 0;
    let prerequisiteTechnique = getTechnique(state, spell.prerequisites);
    let prerequisiteForm = getForm(state, spell.prerequisites);
    let techniqueTotal = Math.min(primaryTechnique, prerequisiteTechnique ?? 1000);
    let formTotal = Math.min(primaryForm, prerequisiteForm ?? 1000);
    let focusBonus = spell.focus ? Math.min(techniqueTotal, formTotal) : 0;

    return techniqueTotal + formTotal + focusBonus + spell.attunementBonus + spell.masteryLevel;
}

function getTechnique(state: State, targetArts: string) {
    let characterArts = state.character.arts;
    if (targetArts.indexOf('Cr') >= 0) return calculateArtScore(characterArts.creo);
    if (targetArts.indexOf('In') >= 0) return calculateArtScore(characterArts.intellego);
    if (targetArts.indexOf('Mu') >= 0) return calculateArtScore(characterArts.muto);
    if (targetArts.indexOf('Pe') >= 0) return calculateArtScore(characterArts.perdo);
    if (targetArts.indexOf('Re') >= 0) return calculateArtScore(characterArts.rego);
    return null;
}

function getForm(state: State, targetArts: string) {
    let characterArts = state.character.arts;
    if (targetArts.indexOf('An') >= 0) return calculateArtScore(characterArts.animal);
    if (targetArts.indexOf('Aq') >= 0) return calculateArtScore(characterArts.aquam);
    if (targetArts.indexOf('Au') >= 0) return calculateArtScore(characterArts.auram);
    if (targetArts.indexOf('Co') >= 0) return calculateArtScore(characterArts.corpus);
    if (targetArts.indexOf('He') >= 0) return calculateArtScore(characterArts.herbam);
    if (targetArts.indexOf('Ig') >= 0) return calculateArtScore(characterArts.ignem);
    if (targetArts.indexOf('Im') >= 0) return calculateArtScore(characterArts.imaginem);
    if (targetArts.indexOf('Me') >= 0) return calculateArtScore(characterArts.mentem);
    if (targetArts.indexOf('Te') >= 0) return calculateArtScore(characterArts.terram);
    if (targetArts.indexOf('Vi') >= 0) return calculateArtScore(characterArts.vim);
    return null;
}

function calculateArtScore(art: Art) {
    return art.level + (art.puissant ? 3 : 0);
}

function calculateFatiguePenalty(state: State) {
    let fatigue = state.character.physicalStatus.fatigue;
    if (fatigue <= 1) return 0;
    if (fatigue === 2) return -1;
    if (fatigue === 3) return -3;
    if (fatigue === 4) return -5;
    return 0;
}

function calculateWoundPenalty(state: State) {
    let status = state.character.physicalStatus;
    return -status.lightWounds + status.mediumWounds * -3 + status.heavyWounds * -5;
}

function refreshWarpingLevel(state: State) {
    state.character.warping.warpingLevel = calculateAbilityLevel(state.character.warping.warpingPoints, 0);
}

function refreshPenetration(state: State) {
    state.character.activeMagic.forEach(m => m.penetration = m.active ? m.penetration : 0);
}