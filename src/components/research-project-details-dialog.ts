import { containerless, IDialogService } from "aurelia";
import { container } from "../main";
import { Lab, ResearchProject } from "../types";
import { deepCopy } from "../utils";

@containerless
export class ResearchProjectDetailsDialog {
    model: ResearchProject;
    lab: Lab;

    get showGoodCycle() {
        return this.lab.cyclicMagicVirtue || this.lab.cyclicMagicFlaw;
    }

    activate (args: { model: ResearchProject, lab: Lab }) {
        this.model = args.model;
        this.lab = args.lab;
    }

    static open(model: ResearchProject, lab: Lab, onSuccess?: () => void) {
        let dialogService = container.get(IDialogService);
        let modelCopy = deepCopy(model);
        dialogService.open({
            component: () => ResearchProjectDetailsDialog,
            overlayDismiss: true,
            model: { model: modelCopy, lab }
        }).whenClosed(_ => {
            model.focus = modelCopy.focus;
            model.specialisationBonus = modelCopy.specialisationBonus;
            model.intelligenceSpecialisation = modelCopy.intelligenceSpecialisation;
            model.magicTheorySpecialisation = modelCopy.magicTheorySpecialisation;
            model.talisman = modelCopy.talisman;
            model.nocturnal = modelCopy.nocturnal;
            model.similarResearchBonus = modelCopy.similarResearchBonus;
            model.labAssistantBonus = modelCopy.labAssistantBonus;
            model.material = modelCopy.material;
            model.materialBonus = modelCopy.materialBonus;
            model.shape = modelCopy.shape;
            model.shapeBonus = modelCopy.shapeBonus;
            model.positiveCycle = modelCopy.positiveCycle;
            model.newWork = modelCopy.newWork;
            model.experiment = modelCopy.experiment;
            if (onSuccess) {
                onSuccess();
            }
        });
    }
}