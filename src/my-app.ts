import { connectTo, jump, localStorageMiddleware, MiddlewarePlacement, rehydrateFromLocalStorage, StateHistory, Store } from "@aurelia/store-v1";
import { createNewCharacter, loadCharacter, updateAbilities, updateActiveMagic, updateAgeing, updateArts, updateCharacteristics, updateConfidence, updateDescription, updateFlaws, updateName, updatePersonalityTraits, updatePhysicalStatus, updateSpells, updateVirtues, updateWarping } from "./actions/sheetActions";
import { ArsCharacter, State } from "./types";

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
    - Its awfully specific, but it would be great to have an indicator next to Perception reminding me of my eye flaw. It would also have 
    a way to read a description of the flaw. This could just be a user definable notification and it may be a standard thing I do for all
    sorts of things similar to the reminders i have in many places on my current character sheet. All the places that the familiar has
    an impact could use this.
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

    Refactorings
    - Make a specialisation of Widget that contains logic for working with lists of stuff (or add it to Widget itself).
        The CSS for this should be standardised as well. The text input could be a component itself.
    - Make all the components be included by default.
    */

    public state: StateHistory<State>;
    
    character: ArsCharacter;

    constructor(private store: Store<StateHistory<State>>) {
        this.store.registerAction('rehydrateFromLocalStorage', rehydrateFromLocalStorage);
        this.store.registerAction('createNewCharacter', createNewCharacter);
        this.store.registerAction('loadCharacter', loadCharacter);
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
        store.registerMiddleware(localStorageMiddleware, MiddlewarePlacement.After, { key: 'character-sheets' });
        store.dispatch(rehydrateFromLocalStorage, 'character-sheets');
    }

    undo = () => {
        this.store.dispatch(jump, -1);
    }
    
    redo = () => {
        this.store.dispatch(jump, 1);
    }
}
