import { connectTo, jump, localStorageMiddleware, MiddlewarePlacement, rehydrateFromLocalStorage, StateHistory, Store } from "@aurelia/store-v1";
import { createNewCharacter, importCharacter, loadCharacter, updateAbilities, updateActiveMagic, updateAgeing, updateArts, updateBackground, updateCharacteristics, updateCharacterType, updateConfidence, updateDescription, updateFlaws, updateLab, updateName, updateNotes, updatePersonalityTraits, updatePhysicalStatus, updateSpellcastingStats, updateSpells, updateVirtues, updateWarping, updateXpEntries } from "./actions/sheetActions";
import { State } from "./types";
import { downloadTextFile } from "./utils";

@connectTo()
export class MyApp {

    /* 
    Feature Suggestions
    - Some way to see details for virtues, flaws, abilities and other things that I sometimes have
    to look up. It could just be a user defined summary.
    - Companion character mode.
    - Character creation mode. Keeps track of virtue/flaw count and types as well as remaining XP and
    spell levels.
    - Working with multiple sheets. Adding new sheets. Easily switching between sheets.
    - Save sheets to google drive: https://stackoverflow.com/questions/36682784/save-text-from-textarea-to-google-drive-using-javascript
    - Ability list grouped by ability category.
    - Sorting of abilities list.

    Design Ideas
    - Some low contrast flourish between the two groups of characteristics.
    - A name box overlaying the top rune line. Above the line to either side are links to the
    pages of the sheet. Maybe we can use one of the fonts for this.
    - Stat boxes could have additional modes: skull, shield.
    - Books are represented by actual book icons.
    - The age block could have a shield or a banner as background.

    Bugs
    - Redo does not seem to work. Its as if there never is a future.
    - Undo triggers a save event. This is not a problem per se, but should not be necessary.
    - Dragging the primary-stat control on the research projects widget is interrupted by the save event. I don't know why it sees it as a change.

    Refactorings
    - Make a specialisation of Widget that contains logic for working with lists of stuff (or add it to Widget itself).
        The CSS for this should be standardised as well. The text input could be a component itself.
    - Make all the components be included by default.
    */

    public state: StateHistory<State>;
    
    constructor(private store: Store<StateHistory<State>>) {
        this.store.registerAction('rehydrateFromLocalStorage', rehydrateFromLocalStorage);
        this.store.registerAction('createNewCharacter', createNewCharacter);
        this.store.registerAction('loadCharacter', loadCharacter);
        this.store.registerAction('importCharacter', importCharacter);
        this.store.registerAction('updateCharacteristics', updateCharacteristics);
        this.store.registerAction('updateName', updateName);
        this.store.registerAction('updateAbilities', updateAbilities);
        this.store.registerAction('updateVirtues', updateVirtues);
        this.store.registerAction('updateFlaws', updateFlaws);
        this.store.registerAction('updateDescription', updateDescription);
        this.store.registerAction('updatePhysicalStatus', updatePhysicalStatus);
        this.store.registerAction('updateArts', updateArts);
        this.store.registerAction('updateSpells', updateSpells);
        this.store.registerAction('updatePersonalityTraits', updatePersonalityTraits);
        this.store.registerAction('updateAgeing', updateAgeing);
        this.store.registerAction('updateConfidence', updateConfidence);
        this.store.registerAction('updateWarping', updateWarping);
        this.store.registerAction('updateActiveMagic', updateActiveMagic);
        this.store.registerAction('updateXpEntries', updateXpEntries);
        this.store.registerAction('updateNotes', updateNotes);
        this.store.registerAction('updateLab', updateLab);
        this.store.registerAction('updateSpellcastingStats', updateSpellcastingStats);
        this.store.registerAction('updateCharacterType', updateCharacterType);
        this.store.registerAction('updateBackground', updateBackground);
        store.registerMiddleware(localStorageMiddleware, MiddlewarePlacement.After, { key: 'character-sheets' });
        store.dispatch(rehydrateFromLocalStorage, 'character-sheets');
    }

    undo = () => {
        this.store.dispatch(jump, -1);
    }
    
    redo = () => {
        this.store.dispatch(jump, 1);
    }

    export = () => {
        downloadTextFile(JSON.stringify(this.state.present.character, null, 4), 'character sheet.json');
    }

    import = () => {
        this.fileInput.click();
        this.fileInput.onchange = this.change;
    }

    newCharacter = () => {
        this.store.dispatch(createNewCharacter);
    }

    fileInput: HTMLInputElement;

    selectedFiles: FileList;
    get theFile() {
        return this.selectedFiles && this.selectedFiles.length > 0 ? this.selectedFiles[0] : null;
    }

    change = () => {
        this.theFile.text().then(t => this.store.dispatch(importCharacter, t));
    }
}