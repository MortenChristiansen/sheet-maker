import { containerless, IDialogService } from "aurelia";
import { container } from "../main";
import { ResearchProject } from "../types";
import { deepCopy } from "../utils";

@containerless
export class ResearchProjectDetailsDialog {
    model: ResearchProject;

    activate (model: ResearchProject) {
        this.model = model;
    }

    static open(model: ResearchProject, onSuccess?: () => void) {
        let dialogService = container.get(IDialogService);
        let modelCopy = deepCopy(model);
        dialogService.open({
            component: () => ResearchProjectDetailsDialog,
            overlayDismiss: true,
            model: modelCopy
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
            if (onSuccess) {
                onSuccess();
            }
        });
    }
}