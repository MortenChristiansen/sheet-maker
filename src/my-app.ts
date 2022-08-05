import { connectTo, jump, localStorageMiddleware, MiddlewarePlacement, rehydrateFromLocalStorage, StateHistory, Store } from "@aurelia/store-v1";
import { createNewCharacter, importCharacter, loadCharacter, loadCharacterFromFile, updateAbilities, updateActiveMagic, updateAgeing, updateArts, updateBackground, updateBelongings, updateCharacteristics, updateCharacterType, updateConfidence, updateDescription, updateFlaws, updateLab, updateMagicItems, updateNotes, updatePersonalityTraits, updatePhysicalStatus, updateQuests, updateSigil, updateSpellcastingStats, updateSpells, updateTalisman, updateVirtues, updateWarping, updateXpEntries } from "./actions/sheetActions";
import { State } from "./types";
import { downloadTextFile } from "./utils";

@connectTo()
export class MyApp {

    /* 
    Feature Suggestions
    - Some way to see details for virtues, flaws, abilities and other things that I sometimes have
    to look up. It could just be a user defined summary.
    - Character creation mode. Keeps track of virtue/flaw count and types as well as remaining XP and
    spell levels.
    - Save sheets to google drive:
        https://stackoverflow.com/questions/36682784/save-text-from-textarea-to-google-drive-using-javascript
        https://gist.github.com/tanaikech/bd53b366aedef70e35a35f449c51eced
    - Ability list grouped by ability category.
    - Puissant arts and abilitis can be identified automatically from virtue names.
    - Somehow remind myself of temporary modifiers to aging roll such as use of the Nocturnal lab rule.
    - Look into PWA jumplist integration.
    - Allow quests to have sub items

    Design Ideas
    - Some low contrast flourish between the two groups of characteristics.
    - A name box overlaying the top rune line. Above the line to either side are links to the
    pages of the sheet. Maybe we can use one of the fonts for this.
    - Stat boxes could have additional modes: skull, shield.
    - Books are represented by actual book icons.
    - The age block could have a shield or a banner as background.

    UX
    - Page title should start with character name, to make it easier to find the right window.

    Bugs
    - Sometimes the PWA is stuck in a save loop for different widgets. Not sure if it is specific to the PWA app.
        Seems related to the times when the Google Drive file deletion prompt appears.

    Refactorings
    - Use add-item-input component where it makes sense.
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
        this.store.registerAction('updateSigil', updateSigil);
        this.store.registerAction('updateBelongings', updateBelongings);
        this.store.registerAction('updateTalisman', updateTalisman);
        this.store.registerAction('updateMagicItems', updateMagicItems);
        this.store.registerAction('updateQuests', updateQuests);
        
        if (this.isStandalone) {
            this.registerFileLaunchHandler();
        } else {
            this.store.registerAction('rehydrateFromLocalStorage', rehydrateFromLocalStorage);
            store.registerMiddleware(localStorageMiddleware, MiddlewarePlacement.After, { key: 'character-sheets' });
            store.dispatch(rehydrateFromLocalStorage, 'character-sheets');
        }

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

