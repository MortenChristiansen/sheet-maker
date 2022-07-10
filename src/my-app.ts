import { connectTo, jump, localStorageMiddleware, MiddlewarePlacement, rehydrateFromLocalStorage, StateHistory, Store } from "@aurelia/store-v1";
import { createNewCharacter, loadCharacter, updateCharacteristics } from "./actions/sheetActions";
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

    Design Ideas
    - Some low contrast flourish between the two groups of characteristics.
    - A name box overlaying the top rune line. Above the line to either side are links to the
    pages of the sheet. Maybe we can use one of the fonts for this.

    */

    public state: StateHistory<State>;
    
    character: ArsCharacter;

    constructor(private store: Store<StateHistory<State>>) {
        this.store.registerAction('rehydrateFromLocalStorage', rehydrateFromLocalStorage);
        this.store.registerAction('createNewCharacter', createNewCharacter);
        this.store.registerAction('loadCharacter', loadCharacter);
        this.store.registerAction('updateCharacteristics', updateCharacteristics);
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
