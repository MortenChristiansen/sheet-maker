import { updateLab } from "../actions/sheetActions";
import { ResearchProjectDetailsDialog } from "../components/research-project-details-dialog";
import { Lab, ResearchProject } from "../types";
import { Widget } from "./widget";

export class ResearchProjects extends Widget<Lab> {
    constructor() {
        super(state => state.character?.lab, updateLab);
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

    editDetails = (project: ResearchProject) => {
        ResearchProjectDetailsDialog.open(project, this.model);
    }

    transformModel(model: Lab) {
        while (model.researchProjects.length < 9) {
            model.researchProjects.push({
                name: '',
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
        if (model.researchProjects.length > 9)
            model.researchProjects = model.researchProjects.slice(0, 9);
        return model;
    }
}