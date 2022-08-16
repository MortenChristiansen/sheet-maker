import { connectTo, jump, localStorageMiddleware, MiddlewarePlacement, rehydrateFromLocalStorage, StateHistory, Store } from "@aurelia/store-v1";
import { createNewCharacter, globalCharacterInfo, importCharacter, loadCharacter, loadCharacterFromFile, updateAbilities, updateActiveMagic, updateAgeing, updateArts, updateBackground, updateCarriedBelongings, updateCharacteristics, updateCharacterType, updateConfidence, updateDescription, updateFamiliar, updateFatigue, updateFlaws, updateLab, updateMagicItems, updateNotes, updateNpcs, updatePersonalityTraits, updateQuests, updateSanctumBelongings, updateSigil, updateSpellcastingStats, updateSpells, updateSpellWishlist, updateTalisman, updateVirtues, updateVis, updateWarping, updateWounds, updateXpEntries } from "./actions/sheetActions";
import { State } from "./types";
import { downloadTextFile } from "./utils";

@connectTo()
export class MyApp {

    /* 
    Feature Suggestions
    - Character creation mode. Keeps track of virtue/flaw count and types as well as remaining XP and
    spell levels.
    - Save sheets to google drive:
        https://stackoverflow.com/questions/36682784/save-text-from-textarea-to-google-drive-using-javascript
        https://gist.github.com/tanaikech/bd53b366aedef70e35a35f449c51eced
    - Ability list grouped by ability category.
    - Somehow remind myself of temporary modifiers to aging roll such as use of the Nocturnal lab rule.
    - Show popup in case of error
    - Lab lab should have a “Construction Year” indicator as well as a button to set it to the current year. This should control the maximum refinement level (along with magic theory)
    - A spontaneous spell list might also be relevant for commonly cast spells.
    - Current correspondence (and perhaps a correspondence history)

    Remaining widgets
    - Arcane connections
    - Books
    - Reputations
    - Avatar/character image
    - Calculations of various rolls (particularly those which the familiar bond gives bonuses for)

    Design Ideas
    - Some low contrast flourish between the two groups of characteristics.
    - A name box overlaying the top rune line. Above the line to either side are links to the
    pages of the sheet. Maybe we can use one of the fonts for this.
    - Stat boxes could have additional modes: skull, shield.
    - Books are represented by actual book icons.
    - The age block could have a shield or a banner as background.

    UX/Layout
    - I can edit the lab mod list in a dialog. That way the headers can just be text rather than inputs.
    - Selecting arts could be changed to a dialog rather than a text field.
    - If the name field is not prominent on every page, maybe the background should be different for different character types.

    Bugs
    - Sometimes the PWA is stuck in a save loop for different widgets. Not sure if it is specific to the PWA app.
        Seems related to the times when the Google Drive file deletion prompt appears.

    Refactorings
    - Create a table component which allows for headers and such.
    - Unify symbols into the Symbol component
    - Create a component (or modify the List component) to allow lists of items of a generic kind. It should have
        a button for adding items and support a fixed height.
        <list add-item-placeholder="Add spell" item-added.bind="spellAdded">
            <div class="spell" repeat.for="spell of model">
                ...
            </div>
        </list>

    */

    middlewareRegistered: boolean = false;
    fileHandle: any;
    isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    public state: StateHistory<State>;
    
    constructor(private store: Store<StateHistory<State>>) {
        this.store.registerAction('createNewCharacter', createNewCharacter);
        this.store.registerAction('loadCharacter', loadCharacter);
        this.store.registerAction('loadCharacterFromFile', loadCharacterFromFile);
        this.store.registerAction('importCharacter', importCharacter);
        this.store.registerAction('updateCharacteristics', updateCharacteristics);
        this.store.registerAction('updateAbilities', updateAbilities);
        this.store.registerAction('updateVirtues', updateVirtues);
        this.store.registerAction('updateFlaws', updateFlaws);
        this.store.registerAction('updateDescription', updateDescription);
        this.store.registerAction('updateFatigue', updateFatigue);
        this.store.registerAction('updateWounds', updateWounds);
        this.store.registerAction('updateArts', updateArts);
        this.store.registerAction('updateSpells', updateSpells);
        this.store.registerAction('updateSpellWishlist', updateSpellWishlist);
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
        this.store.registerAction('updateSigil', updateSigil);
        this.store.registerAction('updateCarriedBelongings', updateCarriedBelongings);
        this.store.registerAction('updateSanctumBelongings', updateSanctumBelongings);
        this.store.registerAction('updateVis', updateVis);
        this.store.registerAction('updateTalisman', updateTalisman);
        this.store.registerAction('updateMagicItems', updateMagicItems);
        this.store.registerAction('updateQuests', updateQuests);
        this.store.registerAction('updateNpcs', updateNpcs);
        this.store.registerAction('updateFamiliar', updateFamiliar);
        
        if (this.isStandalone) {
            this.registerFileLaunchHandler();
        } else {
            this.store.registerAction('rehydrateFromLocalStorage', rehydrateFromLocalStorage);
            store.registerMiddleware(localStorageMiddleware, MiddlewarePlacement.After, { key: 'character-sheets' });
            store.dispatch(rehydrateFromLocalStorage, 'character-sheets');
        }
    }

    stateChanged(newState: StateHistory<State>, oldState: StateHistory<State>) {
        globalCharacterInfo.name = newState.present?.character?.description.name ?? '';
    }

    registerFileLaunchHandler() {
        let launchQueue = (window as any).launchQueue;
        if (launchQueue) {
            launchQueue.setConsumer(async (params) => {
                const [handle] = params.files;
                if (handle) {
                    this.fileHandle = handle;
                    const file = await handle.getFile() as File;
                    if (file) {
                        this.store.dispatch(loadCharacterFromFile, file);
                        this.store.registerMiddleware(this.fileStorageMiddlewareFactory(), MiddlewarePlacement.After);
                    }
                }
            });
        }
    }

    undo = () => {
        this.store.dispatch(jump, -1);
    }
    
    redo = () => {
        this.store.dispatch(jump, 1);
    }

    save = async () => {
        if (this.isStandalone) {
            const opts = {
                suggestedName: 'character sheet.ars',
                types: [{
                    description: 'ARS character sheet',
                    accept: {'text/json': ['.ars']},
                }],
              };
            this.fileHandle = await (window as any).showSaveFilePicker(opts);
            await this.saveFile(this.state);
            if (!this.middlewareRegistered) {
                this.store.registerMiddleware(this.fileStorageMiddlewareFactory(), MiddlewarePlacement.After);
                this.isInitialized = true; // Only relevant when loading an existing file
            }
        } else {
            downloadTextFile(JSON.stringify(this.state.present, null, 4), 'character sheet.ars');
        }
    }

    load = async () => {
        if (this.isStandalone) {
            const opts = {
                types: [{
                    description: 'ARS character sheet',
                    accept: {'text/json': ['.ars']},
                }],
              };
            let [handle] = await (window as any).showOpenFilePicker(opts);
            this.fileHandle = handle;
            this.isInitialized = false;
            if (!this.middlewareRegistered) {
                this.store.registerMiddleware(this.fileStorageMiddlewareFactory(), MiddlewarePlacement.After);
            }
            this.store.dispatch(loadCharacterFromFile, await this.fileHandle.getFile() as File);
        } else {
            this.fileInput.click();
            this.fileInput.onchange = this.fileInputChanged;
        }
    }

    newCharacter = async () => {
        if (this.isStandalone) {
            this.fileHandle = null;
        }

        await this.store.dispatch(createNewCharacter);
        
        if (this.isStandalone) {
            await this.save();
        }
    }

    fileInput: HTMLInputElement;

    selectedFiles: FileList;
    get theFile() {
        return this.selectedFiles && this.selectedFiles.length > 0 ? this.selectedFiles[0] : null;
    }

    fileInputChanged = () => {
        this.theFile.text().then(t => this.store.dispatch(importCharacter, t));
    }

    isInitialized: boolean = false;
    fileStorageMiddlewareFactory = () => {
        this.middlewareRegistered = true;

        let middleware = (state: unknown, _: unknown, settings?: { key: string }) => {
            if (!this.isInitialized) {
                this.isInitialized = true;
                // This happens because loading the state causes the middleware to be triggered
                return;
            }

            console.log("Saving file to disk");
            this.saveFile(state as StateHistory<State>);
        };
        return middleware;
    }

    saveFile = async (state: StateHistory<State>) => {
        if (!this.fileHandle) {
            console.log("Could not save - file handle not set");
            return;
        }

        var writable = await this.fileHandle.createWritable()
        await writable.write(JSON.stringify(state.present, null, 4));
        await writable.close();
    }
}

