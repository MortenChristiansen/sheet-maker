import { StateHistory, Store } from "@aurelia/store-v1";
import { IEventAggregator } from "aurelia";
import { updateLab } from "../actions/sheetActions";
import { Lab, State } from "../types";
import { Widget } from "./widget";

export class ResearchProjects extends Widget<Lab> {
    constructor(store: Store<StateHistory<State>>, @IEventAggregator ea: IEventAggregator) {
        super(store, state => state.character?.lab, updateLab, ea);
    }

    get showGoodCycle() {
        return this.model.cyclicMagicVirtue || this.model.cyclicMagicFlaw;
    }

    itemAdded = (name: string) => {
        this.model.researchProjects.push({
            name,
            accumulatedLabTotal: 0,
            surplusLabTotal: 0,
            artModifier: 0,
            arts: '',
            prerequisites: '',
            focus: false,
            labTotal: 0,
            labAssistantBonus: 0,
            magicTheorySpecialisation: false,
            intelligenceSpecialisation: true,
            material: '',
            materialBonus: 0,
            shape: '',
            shapeBonus: 0,
            similarResearchBonus: 0,
            specialisationBonus: 0,
            talisman: false,
            level: 1,
            experiment: false,
            newWork: true,
            nocturnal: false,
            positiveCycle: false,
            additionalInfo: ''
            });
    }
}