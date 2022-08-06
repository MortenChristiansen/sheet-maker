import { nextStateHistory, StateHistory } from "@aurelia/store-v1";
import { Ability, ArsCharacter, CharacterDescription as CharacterDescription, Art, Arts, Characteristics, Flaw, PhysicalStatus, Spell, State, Virtue, PersonalityTrait, Ageing, Confidence, Warping, ActiveMagic, XpEntry, Lab, LabModification, LabModifierType, LabModifier, SpellcastingStats, Belongings, initialState, Talisman, MagicItem, Quest, Npc } from "../types";
import { deepCopy } from "../utils";

export function createNewCharacter(state: StateHistory<State>) {
    const newState = deepCopy(initialState);
    return nextStateHistory(state, newState);
}

export async function loadCharacterFromFile(state: StateHistory<State>, file: File) {
    const stateText = await file.text();
    const newState = JSON.parse(stateText);
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
    refreshResearchProjects(newState);
    return nextStateHistory(state, newState);
}

export function updateAbilities(state: StateHistory<State>, abilities: Ability[]) {
    console.log("Saving abilities", abilities);
    const newState = deepCopy(state.present);
    newState.character.abilities = filterListItems(abilities);
    refreshResearchProjects(newState);
    refreshCastingTotals(newState);
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
    refreshCastingTotals(newState);
    refreshLab(newState);
    return nextStateHistory(state, newState);
}

export function updateFlaws(state: StateHistory<State>, flaws: Flaw[]) {
    console.log("Saving flaws", flaws);
    const newState = deepCopy(state.present);
    newState.character.flaws = filterListItems(flaws);
    refreshCastingTotals(newState);
    refreshLab(newState);
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
    refreshResearchProjects(newState);
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
    refreshXpEntries(newState);
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

export function updateXpEntries(state: StateHistory<State>, xpEntries: XpEntry[]) {
    console.log("Saving xp entries", xpEntries);
    const newState = deepCopy(state.present);
    newState.character.xpEntries = xpEntries;
    return nextStateHistory(state, newState);
}

export function updateNotes(state: StateHistory<State>, notes: string) {
    console.log("Saving notes", notes);
    const newState = deepCopy(state.present);
    newState.character.notes = notes;
    return nextStateHistory(state, newState);
}

export function updateLab(state: StateHistory<State>, lab: Lab) {
    console.log("Saving lab", lab);
    const newState = deepCopy(state.present);
    newState.character.lab = lab;
    newState.character.lab.virtues = filterListItems(newState.character.lab.virtues);
    newState.character.lab.flaws = filterListItems(newState.character.lab.flaws);
    newState.character.lab.availableModifiers = newState.character.lab.availableModifiers.filter(x => x.name != '');
    newState.character.lab.researchProjects = filterListItems(newState.character.lab.researchProjects);
    refreshLab(newState);
    return nextStateHistory(state, newState);
}

export function importCharacter(state: StateHistory<State>, character: string) {
    console.log("Importing character");
    const newState = deepCopy(state.present);
    newState.character = JSON.parse(character) as ArsCharacter;
    return nextStateHistory(state, newState);
}

export function updateSpellcastingStats(state: StateHistory<State>, spellcastingStats: SpellcastingStats) {
    console.log("Saving spellcasting stats", spellcastingStats);
    const newState = deepCopy(state.present);
    newState.character.spellcastingStats = spellcastingStats;
    refreshCastingTotals(newState);
    return nextStateHistory(state, newState);
}

export function updateCharacterType(state: StateHistory<State>, characterType: "magus" | "companion") {
    console.log("Saving character type", characterType);
    const newState = deepCopy(state.present);
    newState.character.type = characterType;
    refreshCastingTotals(newState);
    return nextStateHistory(state, newState);
}

export function updateBackground(state: StateHistory<State>, background: string) {
    console.log("Saving background", background);
    const newState = deepCopy(state.present);
    newState.character.background = background;
    return nextStateHistory(state, newState);
}

export function updateSigil(state: StateHistory<State>, sigil: string) {
    console.log("Saving sigil", sigil);
    const newState = deepCopy(state.present);
    newState.character.sigil = sigil;
    return nextStateHistory(state, newState);
}

export function updateBelongings(state: StateHistory<State>, belongings: Belongings) {
    console.log("Saving belongings", belongings);
    const newState = deepCopy(state.present);
    newState.character.belongings = belongings;
    newState.character.belongings.vis = filterListItems(belongings.vis);
    return nextStateHistory(state, newState);
}

export function updateTalisman(state: StateHistory<State>, talisman: Talisman) {
    console.log("Saving talisman", talisman);
    const newState = deepCopy(state.present);
    newState.character.talisman = talisman;
    newState.character.talisman.effects = filterListItems(talisman.effects);
    newState.character.talisman.bonuses = filterListItems(talisman.bonuses);
    return nextStateHistory(state, newState);
}

export function updateMagicItems(state: StateHistory<State>, magicItems: MagicItem[]) {
    console.log("Saving magic items", magicItems);
    const newState = deepCopy(state.present);
    newState.character.magicItems = filterListItems(magicItems);
    newState.character.magicItems.forEach(mi => mi.effects = filterListItems(mi.effects))
    return nextStateHistory(state, newState);
}

export function updateQuests(state: StateHistory<State>, quests: Quest[]) {
    console.log("Saving quests", quests);
    const newState = deepCopy(state.present);
    newState.character.quests = filterListItems(quests).sort((a, b) => a.priority - b.priority);
    return nextStateHistory(state, newState);
}

export function updateNpcs(state: StateHistory<State>, npcs: Npc[]) {
    console.log("Saving npcs", npcs);
    const newState = deepCopy(state.present);
    newState.character.npcs = filterListItems(npcs);
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
        // TODO: Include familiar bond
        state.character.ageing.livingConditionModifier +
        state.character.ageing.longevityModifier +
        state.character.lab.livingConditionsModifier +
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
    if (!state?.character?.arts) return;

    state.character.spellcastingStats.cyclicMagicVirtue = state.character.virtues.findIndex(v => v.name.startsWith("Cyclic Magic")) >= 0;
    state.character.spellcastingStats.cyclicMagicFlaw = state.character.flaws.findIndex(v => v.name.startsWith("Cyclic Magic")) >= 0;
    state.character.spellcastingStats.spontaneousCastingTotal = calculateSpontaneousCastingTotal(state);
    state.character.spells.forEach(s => s.castingTotal = calculateFormulaicCastingTotal(state, s));
}

function calculateFormulaicCastingTotal(state: State, spell: Spell) {
    return calculateBaseSpellcastingModifier(state) +
           calculateArtsScore(state, spell.arts, spell.prerequisites, spell.focus) +
           spell.attunementBonus +
           spell.masteryLevel +
           (spell.ritual ? calculateSlowSpellBonus(state, 'Ritual') : 0);
}

function calculateSpontaneousCastingTotal(state: State) {
    let castingStats = state.character.spellcastingStats;
    return calculateBaseSpellcastingModifier(state) +
           calculateArtsScore(state, castingStats.arts, '', castingStats.focus) +
           castingStats.talismanBonus +
           castingStats.similarFomulaicSpellBonus +
           (castingStats.ceremonial ? calculateSlowSpellBonus(state, 'Ceremonial') : 0);
}

function calculateBaseSpellcastingModifier(state: State) {
    let castingStats = state.character.spellcastingStats;
    let positiveCycleValue = castingStats.cyclicMagicVirtue ? 3 : 0;
    let negativeCycleValue = castingStats.cyclicMagicFlaw ? -3 : 0;
    return state.character.characteristics.stamina.value +
           calculateWoundPenalty(state) +
           calculateFatiguePenalty(state) +
           castingStats.aura +
           (castingStats.positiveCycle ? positiveCycleValue : negativeCycleValue) +
           (castingStats.staminaSpecialisation ? 1 : 0) +
           (castingStats.largeGestures ? 1 : 0) +
           (castingStats.loudVoice ? 1 : 0);
}

function calculateSlowSpellBonus(state: State, specialisation: string) {
    let artesLiberales = state.character.abilities.find(a => a.name == 'Artes Liberales');
    let philosophiae = state.character.abilities.find(a => a.name == 'Philosophiae');
    let artesLiberalesSpecialisation = artesLiberales?.specialisation == specialisation ? 1 : 0;
    let philosophiaeSpecialisation = philosophiae?.specialisation == specialisation ? 1 : 0;
    let artesLiberalesPuissant = artesLiberales?.puissant ? 3 : 0;
    let philosophiaePuissant = philosophiae?.puissant ? 3 : 0;
    return (artesLiberales?.level ?? 0) + artesLiberalesSpecialisation + artesLiberalesPuissant +
           (philosophiae?.level ?? 0) + philosophiaeSpecialisation + philosophiaePuissant;
}

function calculateArtsScore(state: State, arts: string, prerequisites: string, focus: boolean) {
    // TODO: Support multiple form or technique prerequisites
    let primaryTechnique = getTechnique(state, arts);
    let primaryForm = getForm(state, arts);
    if (primaryTechnique === null || primaryForm == null) return 0;
    let prerequisiteTechnique = getTechnique(state, prerequisites);
    let prerequisiteForm = getForm(state, prerequisites);
    let techniqueTotal = Math.min(primaryTechnique, prerequisiteTechnique ?? 1000);
    let formTotal = Math.min(primaryForm, prerequisiteForm ?? 1000);
    let focusBonus = focus ? Math.min(techniqueTotal, formTotal) : 0;

    return techniqueTotal + formTotal + focusBonus;
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

function refreshXpEntries(state: State) {

    if (!state.character.xpEntries) {
        state.character.xpEntries = [
            createXpEntry(state.character.ageing.currentYear, 'Spring'),
            createXpEntry(state.character.ageing.currentYear, 'Summer'),
            createXpEntry(state.character.ageing.currentYear, 'Fall'),
            createXpEntry(state.character.ageing.currentYear, 'Winter')
        ];
    }
    state.character.xpEntries = state.character.xpEntries.filter(x => x.year < state.character.ageing.currentYear + 3);
    if (state.character.xpEntries.length == 0) {
        state.character.xpEntries = [
            createXpEntry(state.character.ageing.currentYear, 'Spring'),
            createXpEntry(state.character.ageing.currentYear, 'Summer'),
            createXpEntry(state.character.ageing.currentYear, 'Fall'),
            createXpEntry(state.character.ageing.currentYear, 'Winter')
        ];
    }
    while (state.character.xpEntries[state.character.xpEntries.length - 1].year < state.character.ageing.currentYear + 3) {
        let year = state.character.xpEntries[state.character.xpEntries.length - 1].year + 1;
        state.character.xpEntries.push(createXpEntry(year, 'Spring'));
        state.character.xpEntries.push(createXpEntry(year, 'Summer'));
        state.character.xpEntries.push(createXpEntry(year, 'Fall'));
        state.character.xpEntries.push(createXpEntry(year, 'Winter'));
    }
    state.character.xpEntries.forEach(x => x.planningMode = x.year >= state.character.ageing.currentYear);
}

function createXpEntry(year: number, season: 'Spring' | 'Summer' | 'Fall' | 'Winter') {
    return {
        year: year,
        xp: '',
        correspondence: '',
        description: '',
        plans: '',
        areaLore: '',
        season: season,
        planningMode: true
    };
}

function refreshLab(state: State) {
    refreshModificationModifiers(state.character.lab.virtues, state.character.lab.availableModifiers);
    refreshModificationModifiers(state.character.lab.flaws, state.character.lab.availableModifiers);
    refreshLabStats(state);
    refreshResearchProjects(state);
    refreshAgeingRollModifier(state);
}

function refreshModificationModifiers(modifications: LabModification[], availableModifications: LabModifierType[]){
    modifications.forEach(m =>
        {
            let oldModifiers = m.modifiers.filter(x => x.rating != 0);
            m.modifiers = availableModifications.map(x => ({ name: x.name, rating: 0 }));
            oldModifiers.forEach(x =>
                {
                    let index = m.modifiers.findIndex(y => y.name == x.name);
                    if (index >= 0) {
                        m.modifiers[index].rating = x.rating;
                    }
                });

            if (m.category.length > 1) {
                if ('outfitting'.startsWith(m.category.toLocaleLowerCase())) m.category = 'Outfitting';
                if ('stucture'.startsWith(m.category.toLocaleLowerCase())) m.category = 'Structure';
                if ('supernatural'.startsWith(m.category.toLocaleLowerCase())) m.category = 'Supernatural';
            }
        });
}

export function getLabModifierTotals(lab: Lab): LabModifier[] {
    return lab.availableModifiers.map(m => 
        ({
            name: m.name,
            rating:
                lab.virtues
                .concat(lab.flaws)
                .reduce<LabModifier[]>((partialModifiers, a) => partialModifiers.concat(a.modifiers.filter(y => y.name == m.name)), [])
                .reduce<number>((partialSum, b) => partialSum + b.rating, 0)
        }));
}

function refreshResearchProjects(state: State) {
    let lab = state.character.lab;
    let newWorkBonus = lab.inventiveGeniusVirtue ? 3 : 0;
    let experimentBonus = lab.inventiveGeniusVirtue ? 6 : 0;
    let positiveCycleValue = lab.cyclicMagicVirtue ? 3 : 0;
    let negativeCycleValue = lab.cyclicMagicFlaw ? -3 : 0;
    lab.researchProjects.forEach(r =>
        {
            let magicTheory = state.character.abilities.find(a => a.name == 'Magic Theory')?.level ?? 0;
            let generalQuality = getLabModifierTotals(lab).find(x => x.name == 'GQ')?.rating ?? 0;
            r.artModifier = calculateArtsScore(state, r.arts, r.prerequisites, r.focus);
            r.labTotal =
                lab.auraBonus +
                lab.labBaseQuality +
                generalQuality +
                r.artModifier +
                r.labAssistantBonus +
                magicTheory +
                (Math.max(r.experiment ? experimentBonus : 0, r.newWork ? newWorkBonus : 0)) +
                (r.positiveCycle ? positiveCycleValue : negativeCycleValue) +
                (r.magicTheorySpecialisation ? 1 : 0) +
                state.character.characteristics.intelligence.value +
                (r.intelligenceSpecialisation ? 1 : 0) +
                (r.nocturnal ? 2 : 0) +
                r.materialBonus +
                r.shapeBonus +
                r.similarResearchBonus +
                (r.talisman ? 5 : 0);
            r.surplusLabTotal = r.labTotal - r.level;
        });
}

function refreshLabStats(state: State) {
    let lab = state.character.lab;
    let modifierTotals = getLabModifierTotals(lab);
    let totalCosts = lab.virtues.concat(lab.flaws).reduce<number>((partialSum, x) => partialSum + x.cost, 0);
    lab.occupiedSize = lab.size + totalCosts - lab.refinement;
    let safety = modifierTotals.find(x => x.name == "Safety")?.rating ?? 0;
    let health = modifierTotals.find(x => x.name == "Health")?.rating ?? 0;
    lab.livingConditionsModifier = health >= 0 ? Math.floor(health / 2) : Math.ceil(health / 2);
    lab.effectiveSafety = safety - Math.max(0, lab.occupiedSize) + lab.refinement;
    lab.specialisation1.rating = modifierTotals.find(x => x.name == lab.specialisation1.name)?.rating ?? 0;
    lab.specialisation2.rating = modifierTotals.find(x => x.name == lab.specialisation2.name)?.rating ?? 0;
    lab.art1.rating = modifierTotals.find(x => x.name == lab.art1.name)?.rating ?? 0;
    lab.art2.rating = modifierTotals.find(x => x.name == lab.art2.name)?.rating ?? 0;
    lab.art3.rating = modifierTotals.find(x => x.name == lab.art3.name)?.rating ?? 0;
    lab.art4.rating = modifierTotals.find(x => x.name == lab.art4.name)?.rating ?? 0;
    state.character.lab.inventiveGeniusVirtue = state.character.virtues.findIndex(v => v.name == "Inventive Genius") >= 0;
    state.character.lab.cyclicMagicVirtue = state.character.virtues.findIndex(v => v.name.startsWith("Cyclic Magic")) >= 0;
    state.character.lab.cyclicMagicFlaw = state.character.flaws.findIndex(v => v.name.startsWith("Cyclic Magic")) >= 0;
}