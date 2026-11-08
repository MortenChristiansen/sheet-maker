import { ResearchProjectDetailsDialog } from "../components/research-project-details-dialog";
import { createResearchProject, Lab, ResearchProject } from "../types";
import { LabBase } from "./lab-base";

export class ResearchProjects extends LabBase {

    itemAdded = (name: string) => {
        this.model.researchProjects.push(createResearchProject(name));
    }

    editDetails = (project: ResearchProject) => {
        ResearchProjectDetailsDialog.open(project, this.model);
    }

    transformModel(model: Lab) {
        while (model.researchProjects.length < 9) {
            model.researchProjects.push(createResearchProject());
        }
        if (model.researchProjects.length > 9)
            model.researchProjects = model.researchProjects.slice(0, 9);
        return model;
    }
}
